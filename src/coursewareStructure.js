import { post } from './bronteApiViewerGateway';

const createAnnotationsResource = payload => ({
  get: () => post({
    targetResource: "COURSEWARE_STRUCTURE",
    payload,
  }).then(event => event.data)

});

export default createAnnotationsResource;
