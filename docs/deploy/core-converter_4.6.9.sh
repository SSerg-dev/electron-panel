
#!/bin/bash

### pwd
PWD=`pwd`

### alles backup
systemctl stop alles-loader.service
systemctl stop postgresql
[[ ! -f /alles/config/connect.json ]] && systemctl disable postgresql || systemctl enable postgresql
systemctl stop rc.local
systemctl stop docker
systemctl stop containerd

mkdir -p /tmp/alles

cp -r /alles/bin /tmp/alles
cp -r /alles/commands /tmp/alles
cp -r /alles/config /tmp/alles
cp -r /alles/data /tmp/alles
cp -r /alles/db /tmp/alles
cp -r /alles/log /tmp/alles

sync

### parted
let "FREESPACE_MIN=1073741824*4"

umount -l /dev/mmcblk0p3

parted /dev/mmcblk0 rm 3

echo "Ignore" | parted /dev/mmcblk0 -- mkpart primary ext4 -"$FREESPACE_MIN"B 100%

umount -l /dev/mmcblk0p3

echo "yes" | mkfs -t ext4 -F /dev/mmcblk0p3

umount -l /dev/mmcblk0p3

mount /dev/mmcblk0p3 /alles

cp -r /tmp/alles/* /alles

rm -rf /tmp/alles


cat > /alles/commands/start.sh <<EOL
#!/bin/bash

mv /boot/alles/*.json /alles/config

if [ -f "/alles/config/panel.json" ];
then
  su - root -c "killall -9 panel"
  su - root -c "/alles/bin/panel -platform eglfs debug"
elif [ -f "/alles/config/panel_small.json" ]
then
  su -root -c "/alles/bin/panel_small"
elif [ -f "/alles/config/connect.json" ]
then
  su - root -c "killall -9 connect"
  su - root -c "/alles/bin/connect debug"
fi

exit 0
EOL

sync

START_POSITION=`parted /dev/mmcblk0 unit B print free | tail -n2 | awk '{print $2}' | grep -Eo '[0-9]+'`
let END_POSITION=$START_POSITION-1

echo "Yes" | parted /dev/mmcblk0 -- resizepart 2 "$END_POSITION"B

resize2fs /dev/mmcblk0p2

#e2label /dev/mmcblk0p2 root
#e2label /dev/mmcblk0p3 data

### boot
cat > /boot/config.txt <<EOL
disable_overscan=1
display_rotate=3
hdmi_group=2
hdmi_mode=82
hdmi_drive=2
hdmi_force_hotplug=1
gpu_mem=128
max_usb_current=1
disable_pvt=1
disable_splash=1
avoid_pwm_pll=1
dtparam=audio=on
dtparam=spi=off
temp_limit=75
initial_turbo=20
force_turbo=0
dtoverlay=brcmfmac
enable_uart=1
dtoverlay=disable-bt
dtoverlay=i2c-gpio,i2c_gpio_sda=2,i2c_gpio_scl=3,i2c_gpio_delay_us=2,bus=1
EOL

if ! grep -q "^i2c[-_]dev" /etc/modules;
then
  printf "i2c-dev\n" >> /etc/modules
fi

echo "elevator=deadline root=/dev/mmcblk0p2 rootfstype=ext4 fsck.repair=yes net.ifnames=0 biosdevname=0 rootwait logo.nologo loglevel=1 consoleblank=0 quiet" > /boot/cmdline.txt

### etc
cp rc.local /etc
cp bash.bashrc /etc

## fstab
cat > /etc/fstab <<EOL
proc /proc proc defaults 0 0
tmpfs /tmp tmpfs defaults,size=200M,noatime,nodev,nosuid,mode=1777 0 0
tmpfs /var/log tmpfs defaults,size=100M,noatime,nodev,nosuid,mode=1777 0 0
/dev/mmcblk0p2 / auto defaults,noatime,rw 0 1
/dev/mmcblk0p1 /boot auto defaults,noatime,rw,nofail,x-systemd.automount 0 0
/dev/mmcblk0p3 /alles auto defaults,noatime,rw 0 1
EOL


###systemd
cat > /etc/systemd/system/alles-loader.service <<EOL
[Unit]
Description=Alles-Boot

[Service]
Type=simple
ExecStart=/bin/bash -c '/alles/commands/start.sh'
Restart=always
RestartSec=2
StandardOutput=null
StandardError=null

[Install]
WantedBy=multi-user.target
EOL

## sources.list
echo "deb http://raspbian.raspberrypi.org/raspbian/ stretch main contrib non-free rpi" > /etc/apt/sources.list

rm -f /etc/modprobe.d/disable_wifi.conf


### cron
echo -e "* * * * *   root    /bin/df -h | /bin/grep /$ | /usr/bin/awk \'{if ($5==\"100%\") system (\"/sbin/shutdown -r now\")}\'\n" > /tmp/mycron
crontab /tmp/mycron
systemctl enable cron
rm -f /tmp/mycron

### install apt packages
umount /var/lib/apt/lists
umount /var/cache/apt

curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | gpg --dearmor | tee /usr/share/keyrings/yarnkey.gpg >/dev/null
echo "deb [signed-by=/usr/share/keyrings/yarnkey.gpg] https://dl.yarnpkg.com/debian stable main" | tee /etc/apt/sources.list.d/yarn.list
curl -fsSL https://deb.nodesource.com/setup_16.x | bash -

apt-get install -y nodejs yarn

apt-get install -y -m --no-install-recommends \
build-essential \
util-linux \
procps \
hostapd \
iproute2 \
iptables \
iw \
haveged \
dnsmasq \
ca-certificates \
gnupg \
lsb-release \
libtinfo-dev \
xserver-xorg-core \
xserver-xorg-legacy \
xorg \
x11-apps \
libgtk2.0-0 \
libgtk-3-0 \
libxkbcommon-x11-0 \
libnotify4 \
libgconf2-4 \
libxtst6 \
libatk-bridge2.0-0 \
libasound2 \
matchbox \
dbus \
netcat \
sshpass \
libnss3-dev 

echo "allowed_users=anybody" > /etc/X11/Xwrapper.config

echo "StrictHostKeyChecking no" >> /etc/ssh/ssh_config

cat > /alles/stend.sh <<EOL
#!/bin/bash
nc -z localhost 4840 || sshpass -p "raspberryPIalles78" ssh -f -N -L 4840:192.168.1.2:4840 -p221 root@217.66.149.4 &
nc -z localhost  443 || sshpass -p "raspberryPIalles78" ssh -f -N -L  443:192.168.1.3:443  -p221 root@217.66.149.4 &
EOL

#snap install core
#systemctl daemon-reload
#systemctl stop snapd.service
#systemctl start snapd.service

#snap install ruby --classic
#gem install fpm

### Docker
mkdir -p /alles/docker
mkdir -p /etc/docker
filename=/etc/docker/daemon.json
test -f $filename || touch $filename
cat > $filename <<EOL
{
  "data-root": "/alles/docker",
  "storage-driver": "overlay2"
}
EOL

mkdir -p /etc/apt/keyrings
rm -f /etc/apt/keyrings/docker.gpg
curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
apt-get update
apt-get install -y -m --no-install-recommends docker-ce docker-ce-cli containerd.io docker-compose
usermod -aG docker sudo



### install firmvare packages
export GIT_SSL_NO_VERIFY=1

### PAX driver
systemctl stop serial-getty@ttyS0.service
systemctl disable serial-getty@ttyS0.service
install -D -m 644 ttyPos.ko /lib/modules/$(uname -r)/ttyPos/ttyPos.ko
depmod -a
echo ttyPos > /etc/modules
#cd /tmp
#git clone https://alles-good.gitlab.yandexcloud.net/ldm/ttypos.git
#cd ttypos
#make && make install
#rm -rf /tmp/ttypos


### WiFi AP
cd /tmp
git clone https://alles-good.gitlab.yandexcloud.net/ldm/create_ap.git
cd create_ap
make install
rm -rf /tmp/create_ap

###  OverlayFS
cd /tmp
git clone https://alles-good.gitlab.yandexcloud.net/ldm/root-ro.git
cd root-ro
chmod +x install.sh
./install.sh
rm -rf /tmp/root-ro

/root/reboot-to-readonly-mode.sh
