import { Checkbox, Grid, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    small: {
        width: theme.spacing(10),
        height: theme.spacing(10),
    },
    large: {
        width: theme.spacing(15),
        height: theme.spacing(15),
    },
}));

const ToppingOption = ({name, imagePath, updateItemCount}) => {
    const classes = useStyles();

    const onChangeHandler = (e) => {
        updateItemCount(name, e.target.checked ? 1 : 0);
    };

    return (
        <Grid
            item
            lg={2}
            md={3}
            sm={4}
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
        >
            <Grid item>
                <Avatar
                    src={`http://localhost:3030/${imagePath}`} 
                    alt={`${name} topping`}
                    className={classes.large}
                />
            </Grid>
            <Grid>
                <Checkbox
                    onChange={onChangeHandler}
                    inputProps={{ 'aria-label': `${name}-checkbox` }}
                />
            </Grid>
        </Grid>
    )
}

export default ToppingOption;