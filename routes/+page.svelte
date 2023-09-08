<script>
    import axios from 'axios'
    var x = 0
    vary = 1
    function f() {
        axios
            .get(`http://localhost:3000/${x}`)
            .then(v => x = v.data.x)
    }
    function g() {
        axios
            .post(`http://localhost:3000/`, {a : x, v : [23, 34]})
            .then(v => {
                x = v.data.x
            })
    }
</script>
<button on:click={f}>Get</button>
<button on:click={g}>Post</button>
{x}

<a href="/gachaScreen">sepd ur money here</a>