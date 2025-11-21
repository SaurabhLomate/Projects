## getting started

    first commit

setup project and create some css utilities and classes

---

     second commit

all pages except **sign-in** and **sign-up** has same sidebar. so we group routes in a manner that all routes except **sign-in** and **sign-up** will have similar sidebar.  
 `app->(root)->all_routes` this route contain same sidebar.  
 `app->(auth)->sign-up/sign-in` this routes does not contain sidebar.
