import type { Location } from '../history';

import { createEvent, restore } from 'effector';

import { history } from '../history';

const locationUpdated = createEvent<Location>();
const $location = restore(locationUpdated, history.location);
const $pathname = $location.map(location => location.pathname);

history.listen(location => {
  locationUpdated(location);
});

export { locationUpdated, $location, $pathname };
