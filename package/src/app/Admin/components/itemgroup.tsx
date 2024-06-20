import PropTypes from 'prop-types';
// mui imports
import { ListSubheader, styled, Theme } from '@mui/material';

type ItemGroup = {
  navlabel?: boolean;
  subheader?: string;
};

interface ItemType {
  item: ItemGroup;
}

const ItemGroup = ({ item }: ItemType) => {
  const ListSubheaderStyle = styled((props: Theme | any) => <ListSubheader disableSticky {...props} />)(
    ({ theme }) => ({
      ...theme.typography.overline,
      fontWeight: '700',
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(0),
      color: theme.palette.text.primary,
      lineHeight: '26px',
      padding: '3px 12px',
    }),
  );
  return (
    <ListSubheaderStyle>{item.subheader}</ListSubheaderStyle>
  );
};

ItemGroup.propTypes = {
  item: PropTypes.object,
};

export default ItemGroup;
