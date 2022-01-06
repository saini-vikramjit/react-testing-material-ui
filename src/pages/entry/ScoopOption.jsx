import { TextField } from "@material-ui/core";

// import { upperFirst } from 'lodash';

const ScoopOption = ({name, imagePath, updateItemCount}) => {

    const onChangeHandler = (e) => {
        updateItemCount(name, e.target.value);
    };


    return (
        <div>
            <img
                src={`http://localhost:3030/${imagePath}`} 
                alt={`${name} scoop`}
            />
            <TextField
                type="number"
                defaultValue={0}
                onChange={onChangeHandler}
                variant="outlined"
                inputProps={{
                    "data-testid": `${name}-count`,
                }}
            />
        </div>
    );
}

export default ScoopOption;