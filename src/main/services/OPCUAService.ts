import {
	OPCUAClient,
	MessageSecurityMode, SecurityPolicy,
	AttributeIds,
	ClientSubscription,
	TimestampsToReturn,
	ClientSession,
	ClientMonitoredItemGroup,
	ClientMonitoredItemBase,
	DataValue,
	coerceNodeId,
	resolveNodeId
} from "node-opcua"
import { EventEmitter } from 'events'

import { setIPToLocalSubnet, log } from '../utils'

const TAG = "OPCUA"

class OPCUAService extends EventEmitter {
	private endpointUrl: string = ''// = `opc.tcp://${setIPToLocalSubnet(2)}:4840`
    private TAG_NS = 6

	public nodes: { [key: string]: string; } = {
		TAG_WET_STOP_TIME      : "::AsGlobalPV:PostN[{0}].stopFreeCount",
		TAG_WET_IS_BUSY        : "::AsGlobalPV:PostN[{0}].busy",

		TAG_WET_ENABLED        : "::AsGlobalPV:PostN[{0}].active",
		TAG_WET_BALANCE        : "::AsGlobalPV:PostN[{0}].PanelMoney",
		TAG_WET_PROGRAM        : "::AsGlobalPV:PostN[{0}].prog",
		TAG_WET_PROG_STATUS    : "::AsGlobalPV:PostN[{0}].progStatusMask",
		TAG_WET_PROG_SHOW      : "::AsGlobalPV:PostN[{0}].progShowMask",
		TAG_WET_ADD_MONEY      : "::AsGlobalPV:PostN[{0}].addMoney",
		TAG_WET_ADD_MONEY2     : "::AsGlobalPV:PostN[{0}].addMoneyCount",
		TAG_WET_PROG_PRICE     : "::AsGlobalPV:PostN[{0}].progPrice",
		
		TAG_WET_MONEY          : "::AsGlobalPV:PostBalance[{0}].paidMoney",
		TAG_WET_SERV_MONEY     : "::AsGlobalPV:PostBalance[{0}].paidService",
		TAG_WET_BONUS_MONEY    : "::AsGlobalPV:PostBalance[{0}].paidBonus",
		TAG_WET_ORDER          : "::AsGlobalPV:PostBalance[{0}].order",
		
		TAG_WET_CALL_OPERATOR  : "::AsGlobalPV:PostN[{0}].operatorCall",
		TAG_WET_DOOR           : "::AsGlobalPV:PostN[{0}].door",
		TAG_WET_COLLECT        : "::AsGlobalPV:PostN[{0}].collect",
		TAG_WET_SHOW_OPERATOR_CALL : "::AsGlobalPV:Recipe.ShowOperatorCall",
		TAG_WET_BALANCE_IS_TIME    : "::AsGlobalPV:Recipe.PanelUnitsTime",
		TAG_WET_SHOW_PRICE         : "::AsGlobalPV:Recipe.ShowPrice",
		
		TAG_WET_MONEY_TOTAL    : "::AsGlobalPV:ProcessEventExtern.washState[{0}].money",
		TAG_WET_TIME           : "::AsGlobalPV:ProcessEventExtern.washState[{0}].progTime",
		
		////////////////////////////////////////////////////////////////////////

		TAG_DRY_ENABLED        : "::AsGlobalPV:VacuumPost[{0}].active",
		TAG_DRY_BALANCE        : "::AsGlobalPV:VacuumPost[{0}].panel_money",
		TAG_DRY_PROGRAM        : "::AsGlobalPV:VacuumPost[{0}].program",
		TAG_DRY_PROG_STATUS    : "::AsGlobalPV:VacuumPost[{0}].progStatusMask",
		TAG_DRY_PROG_SHOW      : "::AsGlobalPV:VacuumPost[{0}].progShowMask",
		TAG_DRY_ADD_MONEY      : "::AsGlobalPV:VacuumPost[{0}].addMoney",
		TAG_DRY_ADD_MONEY2     : "::AsGlobalPV:VacuumPost[{0}].addMoneyCount",
		TAG_DRY_PRICE         : "::AsGlobalPV:VacuumPost[{0}].progPrice",
		
		TAG_DRY_MONEY          : "::AsGlobalPV:VacuumBalance[{0}].paidMoney",
		TAG_DRY_SERV_MONEY     : "::AsGlobalPV:VacuumBalance[{0}].paidService",
		TAG_DRY_BONUS_MONEY     : "::AsGlobalPV:VacuumBalance[{0}].paidService",
		TAG_DRY_ORDER          : "::AsGlobalPV:VacuumBalance[{0}].order",

		TAG_DRY_CALL_OPERATOR        : "::AsGlobalPV:Vacuum[{0}].operatorCall",
		TAG_DRY_DOOR                 : "::AsGlobalPV:Vacuum[{0}].door",
		TAG_DRY_COLLECT              : "::AsGlobalPV:Vacuum[{0}].collect",
		TAG_DRY_SHOW_OPERATOR_CALL   : "::AsGlobalPV:VacuumRecipe.ShowOperatorCall",
		TAG_DRY_BALANCE_IS_TIME      : "::AsGlobalPV:VacuumRecipe.PanelUnitsTime",
		TAG_DRY_SHOW_PRICE           : "::AsGlobalPV:VacuumRecipe.ShowPrice",

		TAG_DRY_MONEY_TOTAL   : "::AsGlobalPV:ProcessEventExtern.vacuumState[{0}].money",
		TAG_DRY_TIME          : "::AsGlobalPV:ProcessEventExtern.vacuumState[{0}].progTime",
		
		////////////////////////////////////////////////////////////////////////////

		TAG_KKT_RECEIPT_ENABLED     : "::AsGlobalPV:Recipe.Kkm.PrintReceipt",
		TAG_KKT_INSTALLED           : "::AsGlobalPV:Recipe.Kkm.EnableDevice",
		TAG_KKT_IS_ONLINE           : "::AsGlobalPV:DiagnosticExtern.Kitcash.iLife",
		
		TAG_BONUS_ENABLED           : "::AsGlobalPV:Recipe.Bonus.Enable",
		
		TAG_SERVICE_MONEY           : "::AsGlobalPV:Recipe.ServiceMoneyAmount",
		
		TAG_USER            : "::AsGlobalPV:System.userActiveName",
		TAG_USER_ACCESS     : "::AsGlobalPV:User[{0}].access",
		TAG_USER_NAME       : "::AsGlobalPV:User[{0}].name",
		TAG_USER_PASSWORD   : "::AsGlobalPV:User[{0}].password",
		
		TAG_DATE                : "::AsGlobalPV:DateTime.Date",
		TAG_TIME                : "::AsGlobalPV:DateTime.Time",
	}
	
	private client: OPCUAClient
	private session!: any | ClientSession
	private subscription!: any | ClientSubscription
	private monitoredItemGroup!: ClientMonitoredItemGroup

	constructor(url: string) {
		super()
		this.endpointUrl = url
		this.session = null
		this.subscription = null
		this.client = OPCUAClient.create({
			applicationName: "Panel",
			securityMode: MessageSecurityMode.None,
			securityPolicy: SecurityPolicy.None,
			endpointMustExist: false,
			keepSessionAlive: true,
			connectionStrategy: {
				initialDelay: 2000,
				maxDelay: 10000
			}
		})
	}

	public stop = async () => {
		if (this.session || this.subscription) {
			this.session = null
			this.subscription = null
			try {
				await this.monitoredItemGroup.terminate();
				await this.session.close()
				console.log(`OPC UA session closed`)
				await this.client.disconnect()
				console.log(`OPC UA server disconected`)
			} catch (err) {
				console.log(`OPC UA server disconected or session close - error:`, err)
			}
		}
	}
	
	public start = async (type: string = "Post", num: number = 1) => {
		try {
			await this.stop()
			await this.client.connect(this.endpointUrl)
			console.log(`Connected to ${this.endpointUrl}`)
	
			this.session = await this.client.createSession()
			console.log(`OPC UA session created = ${this.session.sessionId.toString()}`)
	
			this.subscription = ClientSubscription.create(this.session, {
				publishingEnabled: true,
				maxNotificationsPerPublish:  1000,
				requestedPublishingInterval: 1000,
				requestedLifetimeCount:      100,
				requestedMaxKeepAliveCount:   10,
				priority: 10
			})
			
			this.subscription.on("started", () => {
				console.log("subscription started for 2 seconds - subscriptionId=", this.subscription.subscriptionId)
			}).on("keepalive", () => {
				//console.log("keepalive")
			}).on("terminated", () => {
				console.log("terminated")
			})
	
			let itemsToMonitor = []
	
			for (let tag in this.nodes) {
				const node = this.nodes[tag].replace("{0}", String(num-1));
				if ( (type.indexOf("vacuum") != -1 && node.indexOf("Post") != -1) || 
				     (type.indexOf("wash") != -1 && node.indexOf("acuum") != -1) ) {
					continue
				}
				itemsToMonitor.push({
					nodeId: resolveNodeId(`ns=${this.TAG_NS};s=${node}`),
					attributeId: AttributeIds.Value
				});
			}
	
			this.monitoredItemGroup  = ClientMonitoredItemGroup.create(
				this.subscription,
				itemsToMonitor,
				{
					samplingInterval: 10,
					discardOldest: true,
					queueSize: 1
				},
				TimestampsToReturn.Both
			);
	
			this.monitoredItemGroup.on("changed", (monitoredItem: ClientMonitoredItemBase, dataValue: DataValue, index: number) => {
				try {
					const value = String(dataValue.value.value)
					const nodeId = String(monitoredItem.itemToMonitor.nodeId.value)
					//const sbstr = nodeId.substring(nodeId.indexOf('['),nodeId.indexOf(']')+1)
					//const str = sbstr ? nodeId.replace(sbstr,"[{0}]") : nodeId
					//const param = Object.keys(this.nodes).find(key => this.nodes[key] === str)
					//this.emit("change", { param: param, value: value })
					const obj = { param: nodeId, value: value }
					if ( nodeId.indexOf("DateTime") < 0 ) {
						log(TAG, "new data:", JSON.stringify(obj))
					}
					this.emit("change", obj)
				} catch(err) {
					console.log(err)
				}
			});
		} catch (err) {
			log(TAG, "Fault while connecting:", err)
			setTimeout(() => this.start(), 4000)
		}
	};

	public send = async (node: string, value: any, cb: any = null) => {
		const nodeId = resolveNodeId(`ns=${this.TAG_NS};s=${node}`)
		try {
			log(TAG, "Trying send data to server...")
			if (!this.session) {
				throw new Error("No any OPCUA Session connect")
			}
			const dataType = await this.session.getBuiltInDataType(coerceNodeId(nodeId))
			await this.session.write({
				nodeId: nodeId,
				attributeId: AttributeIds.Value,
				value: {
					value: {
						dataType: dataType,
						value: value
					}
				}
			}) 
			log(TAG, "Data to Server is sent:", `${node} = ${value}`)
		} catch(err) {
			log(TAG, "Sending data to Server ends fault:", err)
		}
			
	}
	
	

};

export default OPCUAService