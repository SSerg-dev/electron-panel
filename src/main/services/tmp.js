import {
    OPCUAClient,
    MessageSecurityMode,
    SecurityPolicy,
    AttributeIds,
    TimestampsToReturn,
    coerceNodeId,
    resolveNodeId,
    ClientMonitoredItemGroup,
    ClientSubscription,
    MonitoredItem,
    MonitoringMode
  } from 'node-opcua'
  
  import { EventEmitter } from 'events'
  
  const TAG_NS = 6
  
  const maxUsersNumber = 6
  
  const nodes = {
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
  
  // ------------------------------------
  // USER
  const userNodes = {
    TAG_USER_ACCESS: '::AsGlobalPV:User[{0}].access',
    TAG_USER_NAME: '::AsGlobalPV:User[{0}].name',
    TAG_USER_PASSWORD: '::AsGlobalPV:User[{0}].password'
  }
  
  
  class OPCUAService extends EventEmitter {
    constructor(url) {
      super()
      this.monitoredItemGroup = null
      this.endpointUrl = url
      this.session = null
      this.subscription = null
      this.client = OPCUAClient.create({
              endpointMustExist: false,
              securityMode: MessageSecurityMode.None,
              securityPolicy: SecurityPolicy.None,
              requestedSessionTimeout: 20000,
              keepSessionAlive: true,
              connectionStrategy: {
                  initialDelay: 2000,
                  maxDelay: 10000,
              }
      })
  
      this.client.on("connection_failed", () => {
              console.log(`Client failed to connect.`)
          }).on("connection_lost", () => {
              console.log(`Client lost the connection.`)
          }).on("start_reconnection", () => {
              console.log(`Client is starting the reconnection process.`)
          }).on("reconnection_attempt_has_failed", (_, message) => {
              console.log(`Client reconnection attempt has failed: ${message}`)
          }).on("after_reconnection", () => {
              console.log(`Client finished the reconnection process.`)
          }).on("backoff", (attemptNumber, delay) => {
              console.log(`Client connection retry attempt ${attemptNumber} retrying in ${delay}ms.`)
          }).on("close", () => {
              console.log(`Client closed and disconnected`)
          }).on("timed_out_request", (request) => {
              console.log(`Client request timed out: ${request.toString()}`)
          })
  
    }
  
    async stop() {
      try {
        if (this.subscription !== null) {
          this.monitoredItemGroup && await this.monitoredItemGroup.terminate()
          this.subscription = null
          console.log(`OPC UA unsubcribed`)
        }
        if (this.session !== null) {
          await this.client.closeSession(this.session, true)
          this.session = null
          console.log(`OPC UA session closed`)
        }
        await this.client.disconnect()
        console.log(`OPC UA server disconected`)
      } catch (err) {
        console.log(`OPC UA server disconected or session close - error:`, err)
      }
    }
  
    async start(type = 'wash', num = 1) {
      let itemsToMonitor = []
  
      try {
              //---------------------
              await this.stop()
  
              //---------------------
              await this.client.connect(this.endpointUrl)
              
              console.log(`Connected to ${this.endpointUrl}`)
      
              //---------------------
              this.session = await this.client.createSession()
              
              console.log(`OPC UA session created = ${this.session.sessionId.toString()}`)
  
              this.session.on("keepalive", () => {
                  console.log(`Session keepalive received.`)
              }).on("keepalive_failure", (state) => {
                  console.log(`Session encountered a keepalive error: ${state !== undefined ? state.toString() : "No state provided."}`)
              }).on("session_closed", (statusCode) => {
                  console.log(`Session closed. Status code: ${statusCode.toString()}`)
              }).on("session_restored", () => {
                  console.log(`Session restored.`)
              })
  
        this.subscription = await this.session.createSubscription2({
                  requestedPublishingInterval: 1000,
                  requestedMaxKeepAliveCount: 5,
                  requestedLifetimeCount: 10,
                  maxNotificationsPerPublish: 10,
                  publishingEnabled: true,
                  priority: 10,
        });
  
              this.subscription.on("started", async () => {
                  console.log(`Subscription started, subscriptionId: ${this.subscription.subscriptionId}`)
        }).on("terminated", () => {
                  console.log(`Subscription '${this.subscription.subscriptionId}' was terminated.`)
              }).on("keepalive", () => {
                  console.log(`Subscription '${this.subscription.subscriptionId}' keepalive received.`)
              }).on("internal_error", (err) => {
                  console.log(`Subscription '${this.subscription.subscriptionId}' encountered an internal error: ${err.message}`)
              }).on("status_changed", (status, diagnosticInfo) => {
                  console.log(
                      `Subscription '${this.subscription.subscriptionId}' status changed. New status: ${status.toString()}. ` +
                      `Diagnostics: ${diagnosticInfo.toString()}`
                  )
              }).on("error", (err) => {
                  console.log(`Subscription '${this.subscription.subscriptionId}' encountered a (non-internal) error: ${err.message}`)
              }) 
  
        for (let tag in nodes) {
          if ((type.indexOf('Vacuum') != -1 && nodes[tag].indexOf('Post') != -1) ||
              (type.indexOf('wash') != -1 && nodes[tag].indexOf('acuum') != -1)) {
            continue
          }
          const node = nodes[tag].replace('{0}', String(num - 1))
          itemsToMonitor.push({
            nodeId: "ns=" + String(TAG_NS) + ";s=" + String(node),
            attributeId: AttributeIds.Value
          })
        }
        
        console.log(itemsToMonitor)
  
        const monitoredItems = await this.subscription.monitorItems(
          itemsToMonitor,
          {
            samplingInterval: 100,
            discardOldest: true,
            queueSize: 10
          },
          TimestampsToReturn.Neither
        );
  
        monitoredItems.on('changed', (monitoredItem, dataValue, index) => {
          try {
            const value = String(dataValue.value.value)
            const nodeId = String(monitoredItem.itemToMonitor.nodeId.value)
            const obj = { param: nodeId, value: value }
            //if (nodeId.indexOf('DateTime') < 0) {
              console.log('new data:', JSON.stringify(obj))
            //}
            this.emit('change', obj)
          } catch (err) {
            console.log(err)
          }
        }) 
        
        /*
  
        this.monitoredItemGroup = await this.subscription.monitorItems(
          itemsToMonitor,
          {
            samplingInterval: 50,
            discardOldest: true,
            queueSize: 1
          },
          TimestampsToReturn.Both
        )
  
        console.log("monitor:", this.monitoredItemGroup)
  
        this.monitoredItemGroup.on("err", (err) => console.log("Monitored item group error:", err))
        this.monitoredItemGroup.on("terminated", (err) => console.log("Monitored item group terminated:", err))
        this.monitoredItemGroup.on("initialized", () => console.log("Monitored item group initialized"))
        this.monitoredItemGroup.on('changed', (monitoredItem, dataValue, index) => {
          try {
            const value = String(dataValue.value.value)
            const nodeId = String(monitoredItem.itemToMonitor.nodeId.value)
            const obj = { param: nodeId, value: value }
            //if (nodeId.indexOf('DateTime') < 0) {
              console.log('new data:', JSON.stringify(obj))
            //}
            this.emit('change', obj)
          } catch (err) {
            console.log(err)
          }
        }) */
        // install monitored item
        /* const itemToMonitor = {
          nodeId: resolveNodeId("ns=6;s=::AsGlobalPV:DateTime.Time"),
          attributeId: AttributeIds.Value
        };
        const monitoringParamaters = {
            samplingInterval: 100,
            discardOldest: true,
            queueSize: 100
        };
  
        this.subscription.monitorItems(itemsToMonitor, monitoringParamaters, TimestampsToReturn.Both, (err, monitoredItemGroup) => {
          if (err) {
            console.log(err)
            return
          }
          monitoredItemGroup.on("changed", function (monitoredItem, dataValue, index) {
            const value = String(dataValue.value.value)
            const nodeId = String(monitoredItem.itemToMonitor.nodeId.value)
            const obj = { param: nodeId, value: value }
            //if (nodeId.indexOf('DateTime') < 0) {
              console.log('new data:', JSON.stringify(obj))
            //}
          });
        });
        console.log("-------------------------------------"); */
  
      } catch (err) {
        console.log('Fault while connecting OPCUAService:', JSON.stringify(err))
        setTimeout(() => {
          this.start(type, num)
        }, 5000)
      }
    }
  
    async send(node, value, cb = null) {
      const nodeId = resolveNodeId(`ns=${this.TAG_NS}s=${node}`)
      try {
        console.log('Trying send data to server...')
        if (!this.session) {
          throw new Error('No any OPCUA Session connect')
        }
        const dataType = await this.session.getBuiltInDataType(
          coerceNodeId(nodeId)
        )
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
        console.log('Data to Server is sent:', `${node} = ${value}`)
      } catch (err) {
        console.log('Sending data to Server ends fault:', err)
      }
    }
  }
  
  export default OPCUAService
  