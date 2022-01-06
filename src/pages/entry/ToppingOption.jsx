import { Checkbox } from '@material-ui/core';

const ToppingOption = ({name, imagePath, updateItemCount}) => {

    const onChangeHandler = (e) => {
        updateItemCount(name, e.target.checked ? 1 : 0);
    };

    return (
        <div>
            <img
                src={`http://localhost:3030/${imagePath}`} 
                alt={`${name} topping`}
            />
            <Checkbox
                onChange={onChangeHandler}
                inputProps={{ 'aria-label': `${name}-checkbox` }}
            />
        </div>
    )
}

export default ToppingOption;