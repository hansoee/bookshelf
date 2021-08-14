let e = [];
var id_u = 0;

window.localStorage.time = new Date().getTime();
var today = new Date(parseInt(window.localStorage.time));
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;

window.addEventListener("load",(function(){
    
    e = JSON.parse(localStorage.getItem("books"))||[],
    ambil_data(e); 
    
    const o = document.querySelector("#inputBook"),
    d = document.querySelector("#searchBook");
    o.addEventListener("submit",simpan),
    d.addEventListener("submit",cari),
    document.addEventListener("bookChanged",server);

}));

function goodchars(e, goods){
    var key, keychar;
    
    key = getkey(e);
    if (key == null) return true;
    
    keychar = String.fromCharCode(key);
    keychar = keychar.toLowerCase();
    goods = goods.toLowerCase();
    
    if (goods.indexOf(keychar) != -1)
    return true;
    
    if ( key==null || key==0 || key==8 || key==9 || key==13 || key==27 )
    return true;

    return false;
}

function getkey(event){
    if (window.event)
    return window.event.keyCode;
    else if (event)
    return event.which || event.ctrlKey;
    else
    return null;
}

function data_bin(){

    var hasil = "";
    if(localStorage.getItem("bin") !== null) {
        _("svg_gosok").style.display = "";
        let bin = JSON.parse(localStorage.getItem("bin"));
        if(bin.length){
            for(i=0;i<bin.length;i++){
                hasil += "<table class='table1'>";
                hasil += "<tr><td>id bin</td><td>"+bin[i].id+"</td></tr>";
                hasil += "<tr><td>id book</td><td>"+bin[i].id_book+"</td></tr>";
                hasil += "<tr><td>Judul</td><td>"+bin[i].title+"</td></tr>";
                hasil += "<tr><td>Penulis</td><td>"+bin[i].author+"</td></tr>";
                hasil += "<tr><td>Tahun</td><td>"+bin[i].year+"</td></tr>";
                hasil += "<tr><td>Tgl Entry</td><td>"+bin[i].date_entry+"</td></tr>";
                hasil += "<tr><td>Tgl Edit</td><td>"+bin[i].date_edit+"</td></tr>";
                hasil += "<tr><td>Tgl Hapus</td><td>"+bin[i].date_hapus+"</td></tr>";
                hasil += "<tr><td colspan=2>";
                hasil += '<button id="rest" class="iki" onclick="balikBin(\''+bin[i].id+'\',event)">Restore</button>';
                hasil += "</td></tr>";
                hasil += "</table>";

            } 
             
        }else{
            hasil += "Data Bin tidak Terekam";
        }
    }else{
        hasil += "Data Bin tidak Terekam";
    }
    
    return hasil;
}  

function balikBin(t,event){
    
    event.preventDefault();
    let bin = JSON.parse(localStorage.getItem("bin"));
    

    let result = bin.filter(obj => {
        if(obj.id === parseInt(t)){
            e.push({
                id: obj.id_book,
                title: obj.title,
                author: obj.author,
                year: obj.year,
                isComplete: obj.isComplete,
                date_entry: obj.date_entry,
                date_edit: obj.date_edit
            })
            let notes_s = JSON.stringify(e);
            localStorage.setItem("books", notes_s);
                    
        }
    });
    var index = bin.findIndex(index => index.id===t);
            
    if(index === undefined) return;
    bin.splice(index,1);
    localStorage.setItem('bin', JSON.stringify(bin));
    server();


}

function ambil_data(e){
    var arr = "abcdefghijklmnopqrstuvwxyz".split("");
    var q = 1;
    const t= document.querySelector("#incompleteBookshelfList"),
    n = document.querySelector("#completeBookshelfList");
    t.innerHTML="",n.innerHTML="";
    for(const c of e){
        const e=document.createElement("article");
        e.classList.add("book_item");

        const a=document.createElement("h2");
        a.innerText=c.title;
        
        const u=document.createElement("p");
        u.innerText="Penulis: "+c.author;
        
        const th = document.createElement("p");
        th.innerText="Tahun Terbit: "+c.year;

        const uu = document.createElement("p");
        uu.innerText="Tgl Entry: "+c.date_entry;

        const r = document.createElement("p");
        if(r.innerText="Tgl Edit : "+c.date_edit,e.appendChild(a),
            e.appendChild(u),
            e.appendChild(th),
            e.appendChild(uu),
            e.appendChild(r),
            c.isComplete){
            const t=document.createElement("div");
            t.id = "urai";
            t.classList.add("action");
            const o=document.createElement("button");
            o.id=arr[q]+"_a"+c.id,o.innerText="Jadikan Belum Selesai dibaca",
            o.classList.add("green"),
            o.addEventListener("click",function(event) {
                event.preventDefault();
                balik_belum(c.id);
            
            });

            const oo=document.createElement("button");
            oo.id=arr[q]+"_aa"+c.id,
            oo.innerText="Edit",
            oo.type="button",
            oo.classList.add("iki"),
            oo.addEventListener("click",function(event) {
                event.preventDefault();
                edit(c.id);
            
            });

            const a=document.createElement("button");
            a.id=arr[q]+"_b"+c.id,a.innerText="Hapus buku",
            a.classList.add("red"),
            a.addEventListener("click", function(event) {
                event.preventDefault();
                hapus_item(c.id,event);
            }),
            t.appendChild(o),
            t.appendChild(a),
            t.appendChild(oo),
            e.appendChild(t),
            n.appendChild(e)
        }else{
            const n=document.createElement("div");
            n.id = "urai";
            n.classList.add("action");
            const d=document.createElement("button");
            d.id=arr[q]+"_c"+c.id,d.innerText="Jadikan Selesai dibaca",
            d.classList.add("green"),
            d.addEventListener("click",function() {
                selesaikan(c.id);
            });
            
            const oo=document.createElement("button");
            oo.id=arr[q]+"_aa"+c.id,
            oo.innerText="Edit",
            oo.type="button",
            oo.classList.add("iki"),
            oo.addEventListener("click",function(event) {
                event.preventDefault();
                edit(c.id);
            
            });

            const a = document.createElement("button");
            a.id=arr[q]+"_e"+c.id,a.innerText="Hapus buku"
            a.classList.add("red"),
            a.addEventListener("click", function(event) {
                event.preventDefault();
                hapus_item(c.id,event);
            }),
            n.appendChild(d),
            n.appendChild(a),
            n.appendChild(oo),
            e.appendChild(n),
            t.appendChild(e)
            
        }
        q++;
    }
    var div = data_bin();
    _("_bin").innerHTML = div;
    
}

function selesaikan(t){
    window.event.preventDefault();
    const n = t,selesaikan = e.findIndex((function(e){
        return e.id===n}));-1!==selesaikan&&(e[selesaikan]={...e[selesaikan],isComplete:!0
    },document.dispatchEvent(new Event("bookChanged")));
}

function hapus_item(t,event){
    
    event.preventDefault;

    if(t){
        if (confirm('Yakin menghapus data ini?')) {
            
            var bin = JSON.parse(localStorage.getItem("bin") || "[]");
            let result = e.filter(obj => {
                if(obj.id === t){
                    bin.push({
                        id: +new Date,
                        id_book: obj.id,
                        title: obj.title,
                        author: obj.author,
                        year: obj.year,
                        isComplete: obj.isComplete,
                        date_entry: obj.date_entry,
                        date_edit: obj.date_edit,
                        date_hapus: dateTime.toString()
                    })
                    let notes_s = JSON.stringify(bin);
                    localStorage.setItem("bin", notes_s);
                    
                }
            });


            var index = e.findIndex(index => index.id===t);
            
            if(index === undefined) return;
            e.splice(index,1);
            localStorage.setItem('books', JSON.stringify(e));
            server();
        
            
        }
    }
    
}

function simpan(){
    
    window.event.preventDefault();
    var title = _("inputBookTitle").value;
    var author = _("inputBookAuthor").value;
    var year = _("inputBookYear").value;
    var i = document.querySelector("#inputBookIsComplete");
    var new_id = +new Date;

    var item = e.find(item => item.id === id_u);
    if (item) {
        
        item.title = title;
        item.author = author;
        item.year = year;
        item.isComplete = i.checked;
        item.date_edit = dateTime.toString();
    } else {
        e.push({
            id: new_id,
            title: title,
            author: author,
            year: year,
            isComplete:i.checked,
            date_entry:dateTime.toString(),
            date_edit:""
        })
    }

    localStorage.setItem('books', JSON.stringify(e));
    id_u = 0;
    _("inputBookTitle").value = "";
    _("inputBookAuthor").value = "";
    _("inputBookYear").value = "";
    _("inputBookIsComplete").checked = 0;
    var el = _("bookSubmit");
    el.innerHTML = "Masukkan Buku ke rak <span>Belum selesai dibaca</span>";
    server();
    
}

function cari(t){
    
    t.preventDefault();
    const dari = _("dari").value
    var t_cari = _("searchBookTitle").value;
    var result = e.filter(function(x){ 
        if(dari==1){
            return x.title.toLowerCase().includes(t_cari.toLowerCase());
        }else if(dari==2){
            return x.author.toLowerCase().includes(t_cari.toLowerCase());
        }else if(dari==3){
            return x.year.toLowerCase().includes(t_cari.toLowerCase());
        }
        
    });

    ambil_data(result);
}

function cari_keyup(event){
    cari(event);
}

function server(){
    !function(ser){
        localStorage.setItem("books",
        JSON.stringify(e))
    }(e),ambil_data(e);
}

function hapus(){
    if (confirm('Yakin menghapus semua data\ndan, tidak bisa Dikembalikan?')) {
        window.localStorage.removeItem('books');
        window.localStorage.removeItem('bin');
        location.reload();
    }
}


function hapus_bin(){
    if (confirm('Yakin menghapus semua data Bin\ndan, tidak bisa Dikembalikan?')) {
        window.localStorage.removeItem('bin');
        location.reload();
    }
}

function balik_belum(t){
    window.event.preventDefault();
    const n = t,o=e.findIndex((function(e){
    return e.id===n}));-1!==o&&(e[o]={...e[o],isComplete:!1},
    document.dispatchEvent(new Event("bookChanged")));
}

function _(em){
    return document.getElementById(em);
}


function edit(t){
    window.event.preventDefault();
    var hasil = "";
    let result = e.filter(obj => {
        if(obj.id === t){
            _("inputBookTitle").value = obj.title;
            _("inputBookAuthor").value = obj.author;
            _("inputBookYear").value = obj.year;
            _("inputBookIsComplete").checked = obj.isComplete;
            _("inputBookTitle").focus();
            var el = _("bookSubmit");
            el.innerHTML = "<span>Edit</span>";
            id_u = t;
        }
    });

}