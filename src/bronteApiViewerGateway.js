import postRobot from 'post-robot';

export function frameElementIsAccessible(target) {
  let accessible;
  try {
    accessible = !!target.frameElement;
  } catch (e) {
    accessible = false;
  }
  return accessible;
}

function getTopmostPluginWindow() {
  let currWindow = window;
  while (frameElementIsAccessible(currWindow) && currWindow !== window.top) {
    currWindow = currWindow.parent;
  }
  return currWindow;
}

const topmostPluginWindow = getTopmostPluginWindow();

const getTargetWindow = (target = CDP) => {
  const targetWindow = {
    "CDP" : topmostPluginWindow.parent,
    "PARENT": window.parent,
  }[target];
  if (targetWindow === window) {
    throw new Error('can\'t find target window');
  }
  return targetWindow;
};

export const post = ({
  targetResource, payload, targetWindow,
}) => {

  return postRobot.send(getTargetWindow(targetWindow), targetResource, payload);
};

export const createListener = ({
  targetResource, callback,
}) => postRobot.on(targetResource, callback);

export const listenOnce = ({
  targetResource, window, callback,
}) => postRobot.once(targetResource, { window }, callback);
