type Cover = {
  filePath: string;
  fileName: string;
};

interface _File {
  cover: Cover;
}

interface UploadCover extends Action {
  payload: Promise<Cover>;
}

type DeleteCover = Action;
type GetCover = Action;
type ResetCover = Action;

type FileAction = UploadCover | DeleteCover | GetCover | ResetCover;
