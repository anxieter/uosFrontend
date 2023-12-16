import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { CREATE_SUCCESS, FAILURE_PREFIX, LOGIN_REQUIRED, UPDATE_SUCCESS } from "../constants/string";
import { getBlankBoard, stepBoard, flipCell, boardToString, stringToBoard } from "../utils/logic";
import { NetworkError, NetworkErrorType, request } from "../utils/network";
import { RootState } from "../redux/store";
import { resetBoardCache, setBoardCache } from "../redux/board";
import { useSelector, useDispatch } from "react-redux";
import SupervisePage from "../components/supervisePage";

const BoardScreen = () => {
    /**
     * @todo [Step 3] 请在下述一处代码缺失部分填写合适的代码，使得棋盘状态正确切换且计时器资源分配、释放合理
     */
    const boardCache = useSelector((state: RootState) => state.board.board);
    const userName = useSelector((state: RootState) => state.auth.name);
    const story = useSelector((state: RootState)=>state.story);
    const dispatch = useDispatch();

    const [id, setId] = useState<undefined | number>(undefined);
    const [initBoard, setInitBoard] = useState(getBlankBoard());
    const [board, setBoard] = useState(boardCache);
    const [autoPlay, setAutoPlay] = useState(false);
    const [recordUserName, setRecordUserName] = useState("");
    const [boardName, setBoardName] = useState("");
    const [refreshing, setRefreshing] = useState(false);

    const timerRef = useRef<undefined | NodeJS.Timeout>(undefined);

    const router = useRouter();
    const query = router.query;

    useEffect(() => {
        // if (!router.isReady) {
        //     return;
        // }
        // if (router.query.id === undefined) {
        //     setId(undefined);
        //     return;
        // }
        // if (!/^[0-9]+$/.test(router.query.id as string)) {
        //     router.replace("/");
        //     return;
        // }

        // setRefreshing(true);
        // setId(Number(router.query.id));
        // request(`/api/boards/${router.query.id}`, "GET", false)
        //     .then((res) => {
        //         const fetchedBoard = stringToBoard(res.board);

        //         setBoard(fetchedBoard);
        //         setInitBoard(fetchedBoard);
        //         setBoardName(res.boardName);
        //         setRecordUserName(res.userName);
        //     })
        //     .catch((err) => {
        //         alert(FAILURE_PREFIX + err);
        //         router.push("/");
        //     })
        //     .finally(() => setRefreshing(false));
        // router.push("/mainPage");
    }, [router]);

    return <SupervisePage/>;
};

export default BoardScreen;
