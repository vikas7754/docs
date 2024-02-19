---
layout: default
title: "[ARCHIVE] Prepare Docker for Minerva"
parent: "[ARCHIVE] Minerva Docs"
nav_order: 4
grand_parent: ARCHIVED
has_children: false
---

## Install and configure Docker for Minerva

## Windows

<span style="color:red">### **_THIS IS UNTESTED! WINDOWS AND WSL2/DOCKER ARE STILL EXPERIMENTAL IN SAP_**</span>

You can either run docker native on Windows or via a Linux VM. _WE **STRONGLY** SUGGEST TO USE A LINUX VM, OR A LINUX INSTANCE!_

If you choose the linux VM, instructions can be found [here](##Linux).

For native Windows, you need [WSL2](https://jam4.sapjam.com/articles/bmysSKzqRIAOWVH0uCKiH5) to be **installed and set up correctly**.

Download and install Docker for Windows:
[Docker](https://docs.docker.com/get-docker/) installed and running

If you are on a Windows VM, make sure your virtualisation solution supports "nested virtualisation".

You need to reboot your machine.
Open a windows cmd by making a right-click on your Start-Button and select "Windows PowerShell"

![win-menu](/assets/docs-images/Weekly_Reporting_eMail_KB/win-menu.png)

Now you can try using docker with the CLI.

## MacOS

Please install docker according to the [Official Docker documentation](https://docs.docker.com/desktop/mac/install/)

## Linux

Every supported Linux distribution provides Docker in its repositories.

Ubuntu: sudo apt install docker-ce
SLES: sudo zypper install docker
RHEL: sudo yum install docker-ce docker-ce-cli containerd.io

Please do not forget to enable the docker-daemon:

`sudo systemctl enable --now docker.service`
