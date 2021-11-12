let books = [];
var id_u = 0;
var id_paragrap_cari = 0;

window.addEventListener("scroll", function(){
    var nav = document.querySelector("nav");
    nav.classList.toggle("sticky", window.scrollY > 0);})

window.localStorage.time = new Date().getTime();
var today = new Date(parseInt(window.localStorage.time));
var date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date + " " + time;

window.addEventListener("load", function () {
    books = JSON.parse(localStorage.getItem("books")) || [];

    const in_book = document.querySelector("#inputBook");
    in_book.addEventListener("submit", simpan);

    const s_book = document.querySelector("#searchBook");
    s_book.addEventListener("submit", cari);

    const c_com = _("inputBookIsComplete");
    c_com.addEventListener("change", ganti_tulisan);

    const c_dari = _("dari");
    c_dari.classList.add("iki3");

    ambil_data(books, "");
});

function ganti_tulisan() {
    var i_complete = _("inputBookIsComplete").checked;
    if (i_complete) {
        var el = _("bookSubmit");
        el.innerHTML = "Masukkan Buku ke rak <span>selesai dibaca</span>";
    } else {
        var el = _("bookSubmit");
        el.innerHTML = "Masukkan Buku ke rak <span>Belum selesai dibaca</span>";
    }
}

function goodchars(event, goods) {
    var key, keychar;

    key = getkey(event);
    if (key == null) return true;

    keychar = String.fromCharCode(key);
    keychar = keychar.toLowerCase();
    goods = goods.toLowerCase();

    if (goods.indexOf(keychar) != -1) return true;

    if (key == null || key == 0 || key == 8 || key == 9 || key == 13 || key == 27) return true;

    return false;
}

function getkey(event) {
    if (window.event) return window.event.keyCode;
    else if (event) return event.which || event.ctrlKey;
    else return null;
}

function data_bin() {
    var hasil = "";
    if (localStorage.getItem("bin") !== null) {
        let bin = JSON.parse(localStorage.getItem("bin"));
        if (bin.length) {
            _("svg_gosok").style.display = "block";
            for (i = 0; i < bin.length; i++) {
                hasil += "<table class='table1'>";
                hasil += "<tr><td>id bin</td><td>" + bin[i].id + "</td></tr>";
                hasil += "<tr><td>id book</td><td>" + bin[i].id_book + "</td></tr>";
                hasil += "<tr><td>Judul</td><td>" + bin[i].title + "</td></tr>";
                hasil += "<tr><td>Penulis</td><td>" + bin[i].author + "</td></tr>";
                hasil += "<tr><td>Tahun</td><td>" + bin[i].year + "</td></tr>";
                hasil += "<tr><td>Tgl Entry</td><td>" + bin[i].date_entry + "</td></tr>";
                hasil += "<tr><td>Tgl Edit</td><td>" + bin[i].date_edit + "</td></tr>";
                hasil += "<tr><td>Tgl Hapus</td><td>" + bin[i].date_hapus + "</td></tr>";
                hasil += "<tr><td colspan=2>";
                hasil += '<button id="rest" class="iki" onclick="balikBin(\'' + bin[i].id + "',event)\">Restore</button>";
                hasil += "</td></tr>";
                hasil += "</table>";
            }
        } else {
            hasil += "Data Bin tidak Terekam";
        }
    } else {
        hasil += "Data Bin tidak Terekam";
    }

    return hasil;
}

function balikBin(id_tam, event) {
    event.preventDefault();
    let bin = JSON.parse(localStorage.getItem("bin"));

    let result = bin.filter((obj) => {
        if (obj.id === parseInt(id_tam)) {
            books.push({
                id: obj.id_book,
                title: obj.title,
                author: obj.author,
                year: obj.year,
                isComplete: obj.isComplete,
                date_entry: obj.date_entry,
                date_edit: obj.date_edit,
            });
            let notes_s = JSON.stringify(books);
            localStorage.setItem("books", notes_s);
        }
    });
    var index = bin.findIndex((index) => index.id === id_tam);

    if (index === undefined) return;
    bin.splice(index, 1);
    localStorage.setItem("bin", JSON.stringify(bin));
    if (!bin.length) {
        _("svg_gosok").style.display = "none";
    }
    ambil_data(books, "");
}

function ambil_data(books, t_s) {
    var arr = "abcdefghijklmnopqrstuvwxyz".split("");
    var id_paragrap_cari = 1;
    const incomple = document.querySelector("#incompleteBookshelfList");
    incomple.innerHTML = "";
    const comple = document.querySelector("#completeBookshelfList");
    comple.innerHTML = "";

    var dari = "";
    if (t_s) {
        dari = _("dari").value;
        var par = "";
        if (dari == 1) {
            par = "filter <b>Judul</b> dan";
        } else if (dari == 2) {
            par = "filter <b>Penulis</b> dan";
        } else if (dari == 1) {
            par = "filter <b>Tahun</b> dan";
        }
        const div_0 = document.createElement("div");
        div_0.classList.add("div_cari");
        div_0.innerHTML = "<b>HASIL PENCARIAN</b><br>Menggunakan " + par + " karakter <b>" + t_s + "</b>";

        const div_1 = document.createElement("div");
        div_1.classList.add("div_cari");
        div_1.innerHTML = "<b>HASIL PENCARIAN</b><br>Menggunakan " + par + " karakter <b>" + t_s + "</b>";

        comple.appendChild(div_0);
        incomple.appendChild(div_1);
    }

    for (const ada of books) {
        const articel = document.createElement("article");
        articel.classList.add("book_item");

        const eh2 = document.createElement("h2");
        if (dari == 1) {
            eh2.innerHTML = str_highlight_text(t_s,ada.title);
        }else{
            eh2.innerText = ada.title;
        }
        
        const paragrap1 = document.createElement("p");
        if (dari == 2) {
            paragrap1.innerHTML = "Penulis: " + str_highlight_text(t_s,ada.author);
        }else{
            paragrap1.innerText = "Penulis: " + ada.author;
        }
        
        const paragrap2 = document.createElement("p");
        if (dari == 3) {
            paragrap2.innerHTML = "Tahun Terbit: " + str_highlight_text(t_s,ada.year);
        }else{
            paragrap2.innerText = "Tahun Terbit: " + ada.year;
        }

        const paragrap3 = document.createElement("p");
        paragrap3.innerText = "Tgl Entry: " + ada.date_entry;

        const paragrap4 = document.createElement("p");
        paragrap4.innerText = "Tgl Edit : " + ada.date_edit;

        var tul_button = "Jadikan Belum Selesai dibaca";
        var idb = "blm";
        if (ada.isComplete) {
            var tul_button = "Jadikan Selesai dibaca";
            var idb = "sdh";
        }

        const button1 = document.createElement("button");
        button1.id = idb + "_" + arr[id_paragrap_cari] + "_" + ada.id;
        button1.innerText = tul_button;
        button1.classList.add("green");
        button1.addEventListener("click", function (event) {
            event.preventDefault();
            balik_baca(ada.id);
        });

        const button2 = document.createElement("button");
        button2.id = "hapus_" + arr[id_paragrap_cari] + "_" + ada.id;
        button2.innerText = "Hapus buku";
        button2.classList.add("red");
        button2.addEventListener("click", function (event) {
            event.preventDefault();
            hapus_item(ada.id, event);
        });

        const button3 = document.createElement("button");
        button3.id = "edit_" + arr[id_paragrap_cari] + "_" + ada.id;
        button3.innerText = "Edit";
        button3.classList.add("iki");
        button3.addEventListener("click", function (event) {
            event.preventDefault();
            edit(ada.id);
        });

        const div = document.createElement("div");
        div.classList.add("action");
        div.appendChild(button1), div.appendChild(button2), div.appendChild(button3);

        articel.appendChild(eh2), articel.appendChild(paragrap1), articel.appendChild(paragrap2), articel.appendChild(paragrap3), articel.appendChild(paragrap4), articel.appendChild(div);

        if (ada.isComplete) {
            comple.appendChild(articel);
        } else {
            incomple.appendChild(articel);
        }

        id_paragrap_cari++;
    }

    var da_kosong = cek_data_komplet();
    var cek = da_kosong.split("|");
    if (cek[0]) {
        const lb1 = document.createElement("label");
        lb1.innerHTML = "Tidak Ada Data yang selesai Dibaca";
        comple.appendChild(lb1);
    }

    if (cek[1]) {
        const lb2 = document.createElement("label");
        lb2.innerHTML = "Tidak Ada Data yang belum selesai Dibaca";
        incomple.appendChild(lb2);
    }

    var div = data_bin();
    _("_bin").innerHTML = div;
}

function str_highlight_text(cari,string){
    var reg = new RegExp(cari, 'gi');
    return string.replace(reg, 
    function(str) {
        return '<span class="highlightx">'+str+'</span>';
    });
}

function cek_data_komplet() {
    var h_com = 1;
    var h_incom = 1;
    let result = books.filter((obj) => {
        if (obj.isComplete == 1) {
            h_com = "";
        } else {
            h_incom = "";
        }
    });
    return h_com + "|" + h_incom;
}

function hapus_item(id_tam, event) {
    event.preventDefault;

    if (id_tam) {
        if (confirm("Yakin menghapus data ini?")) {
            var bin = JSON.parse(localStorage.getItem("bin") || "[]");
            let result = books.filter((obj) => {
                if (obj.id === id_tam) {
                    bin.push({
                        id: +new Date(),
                        id_book: obj.id,
                        title: obj.title,
                        author: obj.author,
                        year: obj.year,
                        isComplete: obj.isComplete,
                        date_entry: obj.date_entry,
                        date_edit: obj.date_edit,
                        date_hapus: dateTime.toString(),
                    });
                    let notes_s = JSON.stringify(bin);
                    localStorage.setItem("bin", notes_s);
                }
            });

            var index = books.findIndex((index) => index.id === id_tam);

            if (index === undefined) return;
            books.splice(index, 1);
            localStorage.setItem("books", JSON.stringify(books));
            ambil_data(books, "");
        }
    }
}

function simpan() {
    window.event.preventDefault();
    var title = _("inputBookTitle").value;
    var author = _("inputBookAuthor").value;
    var year = _("inputBookYear").value;
    var i_cek = _("inputBookIsComplete").checked;
    var new_id = +new Date();

    var item = books.find((item) => item.id === id_u);
    if (item) {
        item.title = title;
        item.author = author;
        item.year = year;
        item.isComplete = i_cek;
        item.date_edit = dateTime.toString();
    } else {
        books.push({
            id: new_id,
            title: title,
            author: author,
            year: year,
            isComplete: i_cek,
            date_entry: dateTime.toString(),
            date_edit: "",
        });
    }

    localStorage.setItem("books", JSON.stringify(books));
    id_u = 0;
    _("inputBookTitle").value = "";
    _("inputBookAuthor").value = "";
    _("inputBookYear").value = "";
    _("inputBookIsComplete").checked = false;
    var el = _("bookSubmit");
    el.innerHTML = "Masukkan Buku ke rak <span>Belum selesai dibaca</span>";
    ambil_data(books, "");
}

function cari(event) {
    event.preventDefault();
    const dari = _("dari").value;
    var t_cari = _("searchBookTitle").value;
    if (t_cari) {
        var result = books.filter(function (xobj) {
            if (dari == 1) {
                return xobj.title.toLowerCase().includes(t_cari.toLowerCase());
            } else if (dari == 2) {
                return xobj.author.toLowerCase().includes(t_cari.toLowerCase());
            } else if (dari == 3) {
                return xobj.year.toLowerCase().includes(t_cari.toLowerCase());
            }
        });
        ambil_data(result, t_cari);
    } else {
        ambil_data(books, "");
    }
}

function cari_keyup(event) {
    cari(event);
}

function hapus() {
    if (confirm("Yakin menghapus semua data\ndan tidak bisa Dikembalikan?")) {
        window.localStorage.removeItem("books");
        window.localStorage.removeItem("bin");
        ambil_data(books, "");
    }
}

function hapus_bin() {
    if (confirm("Yakin menghapus semua data Bin\ndan tidak bisa Dikembalikan?")) {
        window.localStorage.removeItem("bin");
        ambil_data(books, "");
    }
}

function balik_baca(id_tam) {
    window.event.preventDefault();
    
    let result = books.filter((obj) => {
        if (obj.id === id_tam) {
            if(obj.isComplete){
                obj.isComplete = false;
            }else{
                obj.isComplete = true;
            }
            
            localStorage.setItem("books", JSON.stringify(books));
            ambil_data(books, "");
        }
    });
}

function _(elemen) {
    return document.getElementById(elemen);
}

function edit(id_tam) {
    window.event.preventDefault();
    var hasil = "";
    let result = books.filter((obj) => {
        if (obj.id === id_tam) {
            _("inputBookTitle").value = obj.title;
            _("inputBookAuthor").value = obj.author;
            _("inputBookYear").value = obj.year;
            _("inputBookIsComplete").checked = obj.isComplete;
            _("inputBookTitle").focus();
            var el = _("bookSubmit");
            if (obj.isComplete) {
                el.innerHTML = "Edit ke rak <span>Selesai dibaca</span>";
            } else {
                el.innerHTML = "Edit ke rak <span>Belum selesai dibaca</span>";
            }

            id_u = id_tam;
        }
    });
}
