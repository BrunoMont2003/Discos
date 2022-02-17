class Node {
  constructor(data) {
    this.data = data; //en data guardamos cualquier objeto que queramos
    this.next = null; // por defecto este es null
  }
}
class LinkedList {
  constructor() {
    this.head = null; //esto significa que no hay nada en la lista
    this.length = 0; //no hay elementos dentro de lista
  }
  //Método Auxiliar
  isEmpty() {
    return this.head === null;
  }
  //Métodos de nuestra lista
  addStart(data) {
    const node = new Node(data); //creamos nuestro nodo con su dato
    if (!this.head) {
      // VERDADERO QUE NUESTRA ESTA VACIA
      this.head = node; //asignamos el primer nodo como la cabeza de la lista
    } else {
      node.next = this.head; // pequeño recorrido tomando el inicio del nodo y la posicion actual
      this.head = node; //nuevo nodo
    }
    this.length++; // saber cuantos elementos tengo en mi lista
  }
  addEnd(data) {
    const node = new Node(data);
    if (this.head === null) {
      this.head = node; //asignamos el primer nodo como la cabeza de la lista
    } else {
      // en este else nosotros ya sabes que existe this.head
      let currentNode = this.head;
      //while: mientas (se cumpla la condición) {haz esto}
      while (currentNode.next) {
        //verificar si next tiene un nodo
        currentNode = currentNode.next; //sustituyo el nodo que vive en next a mi nodo actual
      }
      //cuando next sea nulo, entonces se sale del while y continua con el resto del código
      currentNode.next = node;
    }
    this.length++;
  }
  delete(data) {
    //verificar que dato va a ser borrado
    let currentNode = this.head;
    let previousNode = null; //almacenar el nodo con que tengo que reconectar
    if (currentNode.data === data) {
      //vamos a reasignar la cabeza a mi nodo
      this.head = currentNode.next; //reasigno la cabeza de mi nodo
    } else {
      //ESTAMOS HACIENDO OTRO RECORRIDO, PUESTO QUE ESTAMOS BORRANDO NODOS
      while (currentNode.data !== data && currentNode.next !== null) {
        previousNode = currentNode; // el currentNode se convierte en el previousNode
        currentNode = currentNode.next; //pasar al siguiente nodo
      }
      previousNode.next = currentNode.next;
    }
    this.length--;
  }
  get(index) {
    //    0        ó        index es mayor
    if (this.head === null || index > this.length) {
      return null;
    } else {
      // 1 -> 2 -> 3
      let counter = 1;
      let currentNode = this.head;
      while (counter !== index) {
        counter++;
        currentNode = currentNode.next;
      }
      return currentNode;
    }
  }
  getIndex(node) {
    if (this.head === null) {
      return null;
    } else {
      let counter = 1;
      let currentNode = this.head;
      while (currentNode !== node) {
        counter++;
        currentNode = currentNode.next;
      }
      console.log(currentNode.data);
      return counter;
    }
  }
  getByName(name) {
    let matches = [];
    if (this.head === null) {
      return null;
    } else {
      let counter = 1;
      let currentNode = this.head;
      while (true) {
        counter++;
        let currentName = currentNode.data.nombre.toUpperCase();
        name = name.toUpperCase();
        if (currentName.startsWith(name)) {
          matches.push(currentNode);
        }
        currentNode = currentNode.next;
        if (counter === this.length + 1) {
          break;
        }
      }
    }
    console.log(matches);
    return matches;
  }
  print() {
    //nodo actual
    let currentNode = this.head; // tomar la cabecera
    while (currentNode) {
      console.log(currentNode.data);
      currentNode = currentNode.next;
    }
  }
}

export { LinkedList };
