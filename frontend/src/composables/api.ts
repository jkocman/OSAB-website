export const postFile = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
        await fetch("http://localhost:3000/upload", {
        method: "POST",
        body: formData
        });
    } catch (err) {
        console.error(err);
    }
}


export const getData = async () => {
    const res = await fetch("http://localhost:3000/beatmaps/");
    const data = await res.json();
    return data;
}

export const getBeatmapImage = async (id: number) => {
  const res = await fetch(`http://localhost:3000/beatmaps/${id}/image?v=${Date.now()}`);
  
  if (!res.ok) throw new Error("Image not found");
  
  const blob = await res.blob();
  return URL.createObjectURL(blob);
};