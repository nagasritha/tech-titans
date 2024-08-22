class NewNode<T>{
    data: T; 
    next:NewNode<T> |null;

    constructor(data:T, next:NewNode<T> | null=null){
        this.data=data; 
        this.next=next ;
    }
} 


class LinkedList<T>{
    private first:NewNode<T> | null=null;
    private last:NewNode<T>| null=null;
    private _size:number=0; 

    constructor(...values:T[]){
        for(let value of values){
            this._append(value);
        }
    }

    append(...values:T[]):void{
        for(const value of values){
            this._append(value);
        }
    } 

    isEmpty():boolean{
        return this._size===0
    }

    private _append(value:T):void{
        const newNode=new NewNode(value);
        if(!this.isEmpty()){
            this.first=newNode;
        }
        else{
            this.last!.next=newNode
        }

        this.last=newNode 
        this._size++;
    }

    private validateIndex(index:number):number{
        if(typeof index !== 'number'){
            throw new TypeError('Index must be a number');
        }

        if(index<0||index>=this._size){
            index+=this._size
        }

        if(index<0 || index>= this._size){
            throw new RangeError(`Index out of range :${index}. valid range=`)
        }

        return index
    }

    private locate(index:number): NewNode<T>{
        index=this.validateIndex(index);
        let current=this.first! 
        for(let i=0;i<index;i++){
            current=current.next!;
        }
        return current
    };

    size():number{
        return this._size;
    }
    get(index:number):T{
        return this.locate(index).data
    } 
    set(index:number,value:T):void{
        this.locate(index).data=value
    }

    insert(index:number,value:T):void{
        index=this.validateIndex(index); 

        const node=new NewNode(value) 

        if(index===0){
            node.next=this.first; 
            this.first=node;
        }else{
            const n=this.locate(index-1);
            node.next=n.next; 
            n.next=node;
        }

        this._size++
    }

    remove(index:number):T|undefined {
        this.validateIndex(index) 

        if(index===0){
            const removeNode=this.first 
            this.first=this.first?.next||null  
            if(this.first===null){
                this.last=null
            }
            this._size-- 
            return removeNode?.data
        } 

        const previousNode=this.locate(index-1);
        const removeNode=previousNode.next;
        previousNode.next=removeNode?.next || null; 
        if(removeNode===this.last){
            this.last=previousNode
        } 

        this._size-- 
        return removeNode?.data;

    }

    forEach(execute: (value: T, index: number) => boolean | void): void {
        let i = 0;
        for (let n = this.first; n; n = n.next) {
            if (execute(n.data, i) === false) {
                break;
            }
            i++;
        }
    }

    filter(matcher: (value: T) => boolean): LinkedList<T> {
        const result = new LinkedList<T>();

        this.forEach(v => {
            if (matcher(v)) {
                result.append(v);
            }
        });

        return result;
    }

    find(matcher: (value: T) => boolean): T | undefined {
        let result: T | undefined;

        this.forEach(v => {
            if (matcher(v)) {
                result = v;
                return false;
            }
        });
        return result;
    }

}


export {LinkedList}