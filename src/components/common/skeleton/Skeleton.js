import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonComponent = () => {
    return (
        <SkeletonTheme baseColor='#2C3639' highlightColor='#395B64' enableAnimation={true}>
            <div className='skeleton__wrapper'>
                <div className='skeleton__left'>
                    <div className='skeleton__left-top'>
                        <Skeleton count={1} width={150} height={"2.5rem"} />
                    </div>
                    <Skeleton count={2} width={180} height={"2.5rem"} />
                </div>
                <div className='skeleton__circle'>
                    <Skeleton circle duration={2} width={140} height={140} />
                </div>
            </div>
            <div className='skeleton__middle'>
                <Skeleton count={1} height={"7rem"} />
            </div>
            <div className='skeleton__bottom'>
                <Skeleton count={1} height={"15rem"} />
            </div>
        </SkeletonTheme>
    );
};

export default SkeletonComponent;
