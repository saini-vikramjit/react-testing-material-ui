import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    listItem: {
        color: 'burlywood',
        fontSize: '18px',
        fontWeight: '500',
    },
}));

const ListOrderItems = (props) => {
    const classes = useStyles();
    const { items } = props;

    const itemList = items.map(([key, value]) => {
        return (
            <ListItem key={key} >
                <ListItemText
                    primary={key}
                    secondary={` : ${value}`}
                    disableTypography={true}
                    className={classes.listItem}
                />
            </ListItem>
        );
    })
    return (
        <List
            dense
            disablePadding
        >
           {itemList} 
        </List>
    );
};

export default ListOrderItems;
