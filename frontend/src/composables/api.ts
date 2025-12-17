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
    const res = await fetch("http://localhost:3000");
    const data = await res.json();
    return data;
}