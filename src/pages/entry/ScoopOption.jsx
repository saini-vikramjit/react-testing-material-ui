const ScoopOption = ({name, imagePath}) => (
    <div>
        <img src={`http://localhost.com/${imagePath}`} alt={`${name} scoop`} />
    </div>
);

export default ScoopOption;