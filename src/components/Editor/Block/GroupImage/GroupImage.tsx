import React, { useState } from "react";
import * as S from "./GroupImage.style";

interface ImageData {
  url: string;
  size: number;
  name: string;
  type: string;
}

interface GroupImageProps {
  data: {
    images: ImageData[];
  };
  id: any;
  active: boolean;
}

export default function GroupImage({ data, id, active }: GroupImageProps) {
  const [images, setImages] = useState(data.images);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [droppedIndex, setDroppedIndex] = useState<number | null>(null);

  const onDragStart = (e: React.DragEvent<HTMLImageElement>, index: number) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("imgIndex", String(index));
  };

  const onDragOver = (e: React.DragEvent<HTMLImageElement>, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const onDrop = (e: React.DragEvent<HTMLImageElement>, index: number) => {
    e.preventDefault();
    const sourceIndex = Number(e.dataTransfer.getData("imgIndex"));

    if (sourceIndex === index) return;

    const updatedImages = [...images];
    const [movedImage] = updatedImages.splice(sourceIndex, 1);
    updatedImages.splice(index, 0, movedImage);

    setImages(updatedImages);
    setDragOverIndex(null);

    setDroppedIndex(index);
    setTimeout(() => {
      setDroppedIndex(null);
    }, 300);
  };

  const onDragLeave = () => {
    setDragOverIndex(null);
  };

  return (
    <S.GroupImageContainer>
      {images.map((image, index) => (
        <S.GroupImageItem
          key={index}
          src={image.url}
          alt={image.name}
          draggable
          onDragStart={(e) => onDragStart(e, index)}
          onDragOver={(e) => onDragOver(e, index)}
          onDrop={(e) => onDrop(e, index)}
          onDragLeave={onDragLeave}
          $isDragOver={dragOverIndex === index}
          $isDropped={droppedIndex === index}
        />
      ))}
    </S.GroupImageContainer>
  );
}
