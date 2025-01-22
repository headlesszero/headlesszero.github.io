# headlesszero.github.io
Website for HeadlessZero, a free software package for headless Raspberry Pi projects. Hosted on GitHub Pages. headlesszero.com

[https://www.headlesszero.com](https://www.headlesszero.com)



## Develop Planning / Notes


add_startup_script(name: str, script: str)
add_scheduled_script(name: str, script: str, schedule: str)
add_one_time_initialization_script(name: str, script: str, blocking: bool = False, priority: 


---

FIRST BOOT:
console=serial0,115200 console=tty1 root=PARTUUID=8a438930-02 rootfstype=ext4 fsck.repair=yes rootwait modules-load=dwc2,g_ether quiet init=/usr/lib/raspberrypi-sys-mods/firstboot cfg80211.ieee80211_regdom=CA systemd.run=/boot/firstrun.sh systemd.run_success_action=reboot systemd.unit=kernel-command-line.target


