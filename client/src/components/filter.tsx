interface IProps {
    numberOfItemsFiltered?: number;
    onClick?: () => void;
}

const Filter = (props: IProps) => {
    const { numberOfItemsFiltered, onClick } = props;

    return (
        <div
            className="bg-app-menu flex h-[40px] rounded-lg items-center px-4 gap-1 cursor-pointer"
            onClick={onClick}
        >
            <div className="relative">
                {/* <MaterialIcon icon="filter_alt" color="var(--primary)" /> */}

                {numberOfItemsFiltered ? (
                    <div className="absolute bottom-3 right-4 bg-secondary rounded-full h-[15px] w-[15px] flex items-center justify-center p-1 text-white text-[10px]">
                        {numberOfItemsFiltered}
                    </div>
                ) : (
                    <></>
                )}
            </div>
            <div className="text-text-secondary font-medium">Filter</div>
        </div>
    )
}

export default Filter; 