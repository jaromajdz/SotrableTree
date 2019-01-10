import React, { Component } from 'react';
import DButton from '../UI/DButton/DButton';
import './Tree2.css';



class Tree2 extends Component{

  state = {
    tree: [
            {nname: "TV", colapse: false, highlighted: false, ref: null, ref1: null, path:  null, childrens:[] },
            {nname: "RADIO", colapse: false, highlighted: false, ref: null, ref1: null, path:  null, childrens:[] },
            {nname: "PRALKA", colapse: false, highlighted: false, ref: null,ref1: null, path:  null,

                      childrens:[
                          {nname: "AUTO", colapse: false, highlighted: false, ref: null,ref1: null, path:  null, childrens:[] },
                          {nname: "FRANIA", colapse: false, highlighted: false, ref: null,ref1: null, path:  null,
                            childrens:[
                                {nname: "STARA", colapse: false, highlighted: false, ref: null, ref1: null,path:  null, childrens:[] },
                                {nname: "NOWA", colapse: false, highlighted: false, ref: null,ref1: null, path:  null,
                                    childrens:[
                                          {nname: "Candy", colapse: false, highlighted: false, ref: null,ref1: null, path:  null, childrens:[] },
                                          {nname: "Duperele", colapse: false, highlighted: false, ref: null, ref1: null ,path:  null,
                                        childrens:[
                                          {nname: "Rozne", colapse: false, highlighted: false, ref: null, ref1: null ,path:  null, childrens:[] },
                                          {nname: "Poukladane", colapse: false, highlighted: false, ref: null, ref1: null , path:  null, childrens:[] },
                                          ]
                                  },
                                  {nname: "Bosh", colapse: false, highlighted: false, ref: null,ref1: null, path:  null, childrens:[] },

                                ]
                              },
                            ]
                          },
                      ]
            },


          ],
      rendered_tree: [],
      render: false,
      drag: false
    }

  copyMyTree(array){
    let copyOfTree = []
    for (let id in array){
      let obj = {}

        for(let key in array[id]){
          if(key==='childrens'){
            obj[key] = this.copyMyTree(array[id][key])
          }else{
            obj[key] = array[id][key]
          }

        }
        copyOfTree.push(obj)
      }
    return copyOfTree;

    }



    dragStart = (e, elem) =>{

      this.dragged = e.currentTarget;
      this.setState({drag: true})
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/html', this.dragged);

    }

    dragEnd = (e) =>{
      e.preventDefault();
      e.stopPropagation();

      //if(this.sr[0]===this.tr[0]) return
      this.moveBranch()
          }

    moveBranch(){
      let treeCopy = this.copyMyTree(this.state.tree)
      //Copy source target
      let sr = [...this.sr]
      let tr = [...this.tr]

      let lstsr = sr.pop()
      let lsttr = tr.pop()

      let cpsr, cptr

      if(this.sr.length===1){
        cpsr = this.copyMyTree(this.rich_element(sr, treeCopy))
          treeCopy.splice(lstsr,1)
          //if element if higher then source

          if(this.tr[0]>this.sr[0]){
              this.tr[0]-=1
              tr = [...this.tr]
              lsttr = tr.pop()
          }


      }else {



        cpsr = this.copyMyTree(this.rich_element(sr, treeCopy)['childrens'])
          this.rich_element(sr, treeCopy)['childrens'].splice(lstsr, 1)
          //console.log('miejsce zrodlowe', sr,'copy object', this.rich_element(sr, treeCopy)['childrens'][lstsr])

          if(this.tr[0]===this.sr[0]){
              if(this.tr.length>this.sr.length){
                if(this.sr[this.sr.length-1]<this.tr[this.sr.length-1]){
                    this.tr[this.sr.length-1]-=1
                    tr = [...this.tr]
                    lsttr = tr.pop()
              }
              }
          }
        }

      if(this.tr.length===1){

        treeCopy.splice(this.tr ,0, cpsr[lstsr])

      }else {
          console.log('docelowa sciezka', tr)
          this.rich_element(tr, treeCopy)['childrens'].splice(lsttr, 0, cpsr[lstsr])
      }

          if(this.lastref){
              this.lastref.style.background = 'lightgrey'
            }

          this.setState({tree: this.copyMyTree(treeCopy)})

    }

    openCloseHandler(elem_ref){
      //console.log('elem ref', elem_ref)
      elem_ref['colapse'] = !elem_ref['colapse']
      elem_ref['ref'].style.display = (elem_ref['colapse'] ? 'none' : 'block')
      //force tree render changing the state update colapse or highlighted doesn't effect the render
      this.setState({render: !this.state.render, drag: false})
    }

setDrag =(e, src)=>{
    console.log('SRC', src);
    this.sr = [...src]
  }

onOver =(e, tr)=> {
    //console.log('onOver', tr, e.target)
    e.preventDefault()

  this.tr = tr.path

  if(this.lastref){
    this.lastref.style.background = 'lightgrey'
  }

    tr.ref1.style.backgroundColor = 'white'
    this.lastref = tr.ref1

  }

rich_element(path, tree){
  if(path.length>0){
    for(let id = 0; id<path.length; id++ ){
      if(id===0){
        tree=tree[path[id]]
      }else{
        tree = tree['childrens'][path[id]]
      }
    }
  }
  return tree
}


path = []


tree_copy(sr){
    return JSON.parse(JSON.stringify(sr));
}

render_tree(tree){

  let list = []

  for (let id in tree){

      this.path.push(id)
        //console.log('Node',  tree[id]['nname'], [...this.path] )
      tree[id]['path'] = [...this.path]

      if(tree[id].childrens.length>0){

        //console.log('colapse',id, tree[id].colapse);

        list.push(
                <li key={id + '0'} draggable="true" onDragStart={(e)=>this.dragStart(e, tree[id])} onDragEnd={e=>this.dragEnd(e)}>

                    <div className="lidiv1">
                      <DButton show={!tree[id].colapse} click={()=>this.openCloseHandler(tree[id])}/>
                        <div ref={r=>tree[id].ref1 = r} className = "outsidechoose"  onDragOver={e=>this.onOver(e, tree[id])} onMouseDown={(e)=>this.setDrag(e, tree[id].path)}>
                              {tree[id].nname}
                          <div className = "choosediv"></div>
                        </div>
                    </div>
                    <ul ref={r=>tree[id].ref = r} style={{display: 'block'}}>
                      {this.render_tree(tree[id].childrens)}
                    </ul>
                </li>
                )
          //this.path.pop()
      }else {
          list.push(<li key={id+'0'} draggable="true" onDragStart={(e)=>this.dragStart(e, tree[id])} onDragEnd={e=>this.dragEnd(e)}>
                    <div className="lidiv" >
                        <div className ="outsidechoose"  onDragOver={e=>this.onOver(e, tree[id])}
                                  ref={r=>tree[id].ref1 = r} onMouseDown={(e)=>this.setDrag(e, tree[id].path)}>
                              {tree[id].nname}
                          <div className = "choosediv"  ></div>
                        </div>
                    </div>

                </li>)
          this.path.pop()
        }

  }
  this.path.pop();
  return list

}


render(){

  const treee =  <div><ul >{this.render_tree(this.state.tree)}</ul></div>

  return <div>{treee}</div>
}

}

export default Tree2;
