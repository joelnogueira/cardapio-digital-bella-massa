const formData = new FormData(this);
    fetch("../../../admin/login.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "erro") {
            alert("teste")

        })