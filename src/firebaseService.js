import { firebaseDatabase } from "./firebase";

export default class FirebaseService {
  static getDataList = (nodePath, callback) => {
    let query = firebaseDatabase.ref(nodePath);
    query.on("value", dataSnapshot => {
      let items = [];
      dataSnapshot.forEach(childSnapshot => {
        let item = childSnapshot.val();
        item["key"] = childSnapshot.key;
        items.push(item);
      });
      callback(items);
    });

    return query;
  };

  static pushData = (node, objToSubmit) => {
    const ref = firebaseDatabase.ref(node).push();
    const id = firebaseDatabase.ref(node).push().key;
    ref.set(objToSubmit);
    return id;
  };

  static getData = (id, node, callback) => {
    let query = firebaseDatabase.ref(node + "/" + id);
    query.on("value", dataSnapshot => {
      let item = dataSnapshot.val();

      callback(item);
    });
    return query;
  };

  static writeNewPost(post) {
    console.log("inserindo");
    console.table(post);
    firebaseDatabase
      .ref("posts/")
      .push(post)
      .then(data => {
        //success callback
        console.log("data ", data);
      })
      .catch(error => {
        //error callback
        console.log("error ", error);
      });
  }

  static writeNewUser(user) {
    firebaseDatabase
      .ref("users/")
      .push(user)
      .then(data => {
        //success callback
        console.log("Usuario inserido Sucesso:", data);
      })
      .catch(error => {
        //error callback
        console.log("error ", error);
      });
  }
  static updateLike(key, like, post) {
    console.log("77777777sss777777777:", key, like);
    firebaseDatabase.ref("posts/").update({
      [key]: {
        title: post.title,
        author: post.author,
        image: post.image,
        date: post.date,
        text: post.text,
        likes: like
      }
    });
    console.log("Adicona like:", key, like);
  }
  static removeDataBase(id, node) {
    firebaseDatabase.ref(node + "/" + id).remove();
  }
}
