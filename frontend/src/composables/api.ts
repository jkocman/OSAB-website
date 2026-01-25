import router from "@/router";

export const postFile = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const token = localStorage.getItem("token");
    if (!token) throw new Error("Token není v localStorage");
    console.log(token);

    await fetch("http://localhost:3000/upload", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: formData,
    });
};

export const getAllBeatmaps = async () => {
    const res = await fetch("http://localhost:3000/beatmaps");
    if (!res.ok) throw new Error("Failed to fetch beatmaps");
    return res.json();
};

export const getUserBeatmaps = async (userId: number) => {
  const res = await fetch(
    `http://localhost:3000/beatmaps?userId=${userId}`
  );
  if (!res.ok) throw new Error("Failed to fetch user beatmaps");
  return res.json();
};

export const deleteBeatmap = async (id: number) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Token není v localStorage");

    const res = await fetch(`http://localhost:3000/beatmaps/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
    });
}

export const updateDownloads = async (id: number) => {
    const res = await fetch(`http://localhost:3000/beatmaps/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
    })
}

export const getBeatmapImage = (id: number) => {

  return `http://localhost:3000/beatmaps/${id}/image?v=${Date.now()}`;
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
        const data = await res.json();
        throw new Error(data.error || "Wrong email or password.");
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

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.error);
    }


    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    router.push("/dashboard")
}

export const downloadGame = async(variant: "osab_stable" | "osab_experimental") => {
    const res = await fetch(`http://localhost:3000/download/game/${variant}`);

    if (!res.ok) {
        alert("Chyba při získávání odkazu");
        return;
    }

    const data = await res.json();
    const downloadUrl = data.url;

    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = `${variant}.zip`; 
    document.body.appendChild(a);
    a.click();
    a.remove();
}

export const downloadBeatmap = (id: number, name: string) => {
    const url = `http://localhost:3000/download/beatmap/${id}`;
    
    const a = document.createElement("a");
    a.href = url;
    a.download = `${name}-${id}.zip`; 
    
    document.body.appendChild(a);
    a.click();
    a.remove();
};