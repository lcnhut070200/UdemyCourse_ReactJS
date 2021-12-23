import React from "react";
import AlbumItem from "../AlbumItem";
import "./styles.scss";

AlbumList.propTypes = {};

function AlbumList(props) {
  const { albumList } = props;
  return (
    <div>
      <ul className="album-list">
        {albumList.map((album) => (
          <li key={album.id}>
            <AlbumItem album={album} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AlbumList;
