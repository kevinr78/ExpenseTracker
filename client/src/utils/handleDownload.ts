async function handleDownload(type: string) {
  try {
    console.log(type);
    const request = await fetch(
      `http://localhost:3000/report/generate?user_id=1&type=${type}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const blob = await request.blob();

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = `${type}_report.pdf`;
    a.click();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.log(error);
  }
}

export default handleDownload;
