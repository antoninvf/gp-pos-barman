import { Grid, rem } from '@mantine/core';

import { apiHooks } from '../../../api';

interface IKitchenQueueProps {}

export const KitchenQueueList = (props: IKitchenQueueProps) => {
  const { data } = apiHooks.useGetKitchenQueue();

  return (
    <Grid grow gutter={{ base: 'md', md: 'xl' }}>
      {data?.items.map(({ uuid, productuuid, note, timeadded }) => {
        return (
          <Grid.Col span={{ xs: 6, md: 4 }} style={{ minHeight: rem('200') }} key={uuid}>
            <p>{uuid}</p>
            <p>{productuuid}</p>
            <p>{note}</p>
            <p>{timeadded}</p>
          </Grid.Col>
        );
      })}
    </Grid>
  );
};
