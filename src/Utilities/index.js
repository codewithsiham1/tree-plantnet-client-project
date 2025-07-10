export const shortImageName = (image, length = 10) => {
    if (!image || !image.name) return 'Choose Image';
    if (image.name.length <= 15) return image.name;
    return image.name.substring(0, length) + '...';
  };