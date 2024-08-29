import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'net.savvylawnserviceapp',
  appName: 'Savvy Lawn Services',
  webDir: 'public',
  bundledWebRuntime: false,
	server: {
		url: "http://10.0.0.198:3001",
		cleartext: true
	}
};

export default config;
