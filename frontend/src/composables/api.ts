import router from "@/router";

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
    const user = localStorage.getItem("user");
    if(user){
        const userObj = JSON.parse(user)
        const res = await fetch(`http://localhost:3000/beatmaps?=${userObj.id}`);
        const data = await res.json();
        return data;
    }
    else{
        const res = await fetch(`http://localhost:3000/beatmaps/`);
        const data = await res.json();
        return data;
    }
}

export const getBeatmapImage = async (id: number) => {
  const res = await fetch(`http://localhost:3000/beatmaps/${id}/image?v=${Date.now()}`);
  
  if (!res.ok) throw new Error("Image not found");
  
  const blob = await res.blob();
  return URL.createObjectURL(blob);
};

export const login = async (email: string, password: string) => {
const res = await fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  if (!res.ok) {
    throw new Error("Login failed");
  }

  const data = await res.json();

  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));

  router.push("/dashboard")
}

export const register = async (email: string, username: string, password: string) => {
    const res = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, email, password })
    })
    if (!res.ok) {
        throw new Error("Login failed");
    }

    const data = await res.json();

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    router.push("/dashboard")
}