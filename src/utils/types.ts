export type Board = (0 | 1)[][];
export type Content = string|ImageBitmap;
/**
 * @note 用于前后端交互的 Board 数据格式
 */
export interface BoardMetaData {
    id: number;
    boardName: string;
    createdAt: number;
    userName: string;
}