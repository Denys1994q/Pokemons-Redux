import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonComponent = () => {
    return (
        <SkeletonTheme baseColor='#2C3639' highlightColor='#395B64' enableAnimation={true}>
            <div className='skeleton-wrapper'>
                <div className='skeleton-left'>
                    <div className='skeleton-left-top'>
                        <Skeleton count={1} width={150} height={"2.5rem"} />
                    </div>
                    <Skeleton count={2} width={180} height={"2.5rem"} />
                </div>
                <Skeleton circle duration={2} width={150} height={150} />
            </div>
            <div className='skeleton-middle'>
                <Skeleton count={1} height={"7rem"} />
            </div>
            <div>
                <Skeleton count={1} height={"15rem"} />
            </div>
        </SkeletonTheme>
    );
};

export default SkeletonComponent;
