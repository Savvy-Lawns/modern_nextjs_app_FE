import type { CapacitorConfig } from '@capacitor/cli';
const serverURL =  'https://seal-app-xfxk3.ondigitalocean.app';
const config: CapacitorConfig = {
  appId: 'net.savvylawnserviceapp',
  appName: 'Savvy Lawn Services',
  webDir: 'public',
  bundledWebRuntime: false,

	server: {
		url: `${serverURL}:3001`,
		cleartext: true
	}
};

export default config;
