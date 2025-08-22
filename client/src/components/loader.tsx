interface IProps {
  show: boolean;
  isBoundToParent?: boolean;
}
const Loader = (props: IProps) => {
  const { show, isBoundToParent = false } = props;

  if (show) {
    if (isBoundToParent) {
      return (
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
        </div>
      );
    }

    return (
      <div className="fixed inset-0 flex justify-center items-center bg-black/30 backdrop-blur-sm z-50">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }
};

export default Loader;