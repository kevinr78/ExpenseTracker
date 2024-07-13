class APIRequest{
    _headers = {
        "Content-Type": "application/json",
      }
    constructor(method, body,endpoint){
        this.method=method
        this.body= JSON.stringify(body),
        this.endpoint=endpoint
    }

     async sendRequest(){
        let result = await fetch(`http://localhost:3000/${this.endpoint}`,{
            method:this.method,
            body:this.body,
            headers:this._headers
        })

        return await result.json();
    }

}

export default APIRequest