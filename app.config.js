const IS_DEV = process.env.APP_VARIANT === 'development';
const IS_PREVIEW = process.env.APP_VARIANT === 'preview';

const getUniqueIdentifier = () => {
  if (IS_DEV) {
    return 'com.ericleonen.countdown.dev';
  }

  if (IS_PREVIEW) {
    return 'com.ericleonen.countdown.preview';
  }

  return 'com.ericleonen.countdown';
};

const getAppName = () => {
  if (IS_DEV) {
    return 'Countdown (Dev)';
  }

  if (IS_PREVIEW) {
    return 'Countdown (Preview)';
  }

  return 'Countdown';
};

export default {
  "expo": {
    "name": "countdown",
    "slug": "countdown",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "scheme": "myapp",
    "userInterfaceStyle": "automatic",
    "newArchEnabled": true,
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": getUniqueIdentifier()
    },
    "web": {
      "bundler": "metro",
      "output": "static",
      "favicon": "./assets/images/favicon.png"
    },
    "plugins": [
      "expo-router",
      [
        "expo-splash-screen",
        {
          "image": "./assets/images/splash-icon.png",
          "imageWidth": 200,
          "resizeMode": "contain",
          "backgroundColor": "#ffffff"
        }
      ]
    ],
    "experiments": {
      "typedRoutes": true
    },
    "extra": {
      "router": {
        "origin": false
      },
      "eas": {
        "projectId": "f182f833-da58-4d99-a24c-6eddc0ebd7a5"
      }
    },
    "owner": "ericleonen"
  }
}
