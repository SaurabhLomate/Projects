# 👩‍💻 Installation

```bash
    npm i
```

# 📝 What I learn in this project

# 😁 Mini Doc 😁

- effiecient way to connect database
- where to use the global error handling middlware
  > at the last
- in middleware we must access next parameter even though we don't use it or else we will get error
- we shouldn't show errors when in **production environment**
- if we create the methods using **Schema** then we should add them in the interface otherwise we can't access it in controllers or any other places
  > cloudinary
- in cloudinary if we want to delete files like jpeg, png we have a method like **cloudinary.uploader.destroy(public_id)**
- and if we want to delete the raw files then we have a method like **cloudinary.api.delete_resources([public_id],{resource_type:'raw'})**
- **public_id in cloudinary** -- suppose we have a cloudinary file url [https://res.cloudinary.com/dcu3dqzfc/image/upload/v1757526336/cover_images/gzxbufeun5as1wxmw5l9.png]() then the last part is the public_id of our file [cover_images/gzxbufeun5as1wxmw5l9]() here cover_images is the folder name and next part is the file name
- for raw files, in public_id the extension is also included like [cover_images/gzxbufeun5as1wxmw5l9.pdf]()
