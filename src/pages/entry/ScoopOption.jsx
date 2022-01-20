import { useState } from "react";

import { TextField, Grid, Avatar } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

// import { upperFirst } from 'lodash';

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

const ScoopOption = ({name, imagePath, updateItemCount}) => {
    const classes = useStyles();

    const [isInvalid, setIsInvalid] = useState(true);

    const onChangeHandler = (e) => {
        const currentValue = e.target.value;
        const currentValueFloat = parseFloat(currentValue);

        const valueIsValid = 0 <= currentValueFloat && currentValueFloat <= 10 && Math.floor(currentValueFloat) === currentValueFloat;

        setIsInvalid(valueIsValid);

        if (valueIsValid) updateItemCount(name, e.target.value);
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
                    alt={`${name} scoop`}
                    className={classes.large}
                />
            </Grid>
            <Grid>
                <TextField
                    type="number"
                    label={name}
                    defaultValue={0}
                    onChange={onChangeHandler}
                    variant="filled"
                    error={!isInvalid}
                    inputProps={{
                        "data-testid": `${name}-count`,
                    }}
                />
            </Grid>
        </Grid>
    );
}

export default ScoopOption;