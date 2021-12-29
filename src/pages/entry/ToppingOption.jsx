const ToppingOption = ({name, imagePath}) => {
    return (
        <div>
            <img src={`http://localhost.com/${imagePath}`} alt={`${name} topping`} />
        </div>
    )
}

export default ToppingOption;