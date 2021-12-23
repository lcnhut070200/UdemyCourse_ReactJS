import React from "react";
import AlbumList from "./components/AlbumList";

AlbumFeature.propTypes = {};

function AlbumFeature(props) {
  const albumList = [
    {
      id: 1,
      name: "Đắng Nồng Cay (Single)",
      thumbnailUrl:
        "https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/cover/e/c/1/f/ec1f71ffa2af5b75029600dc6ce537c5.jpg",
    },
    {
      id: 2,
      name: "Quên Đi Thì Hơn (Single)",
      thumbnailUrl:
        "https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/cover/b/5/a/a/b5aa4ffc760f237a065ef8af5918a760.jpg",
    },
    {
      id: 3,
      name: "Làm Việc Mình (Single)",
      thumbnailUrl:
        "https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/cover/9/2/5/2/925297a7289444bcdb98cf096ee9d467.jpg",
    },
  ];
  return (
    <div>
      <h2>Có thể bạn sẽ thích</h2>
      <AlbumList albumList={albumList} />
    </div>
  );
}

export default AlbumFeature;
