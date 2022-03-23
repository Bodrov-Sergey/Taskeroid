/* eslint-disable no-console */
import { createDomain } from 'effector';

const apiDomain = createDomain();

apiDomain.onCreateEffect(fx => {
  if (import.meta.env.DEV) {
    fx.doneData.watch(data => {
      console.log('<--- Successful Request to API --->');
      console.dir(data);
    });

    fx.failData.watch(data => {
      console.log('<--- Failed Request to API --->');
      console.error(data);
    });
  }
});

export { apiDomain };
