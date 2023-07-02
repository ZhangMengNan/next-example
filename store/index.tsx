import { enableStaticRendering,useLocalObservable } from 'mobx-react-lite';
import { ReactElement,createContext,useContext } from 'react';

import createStore,{ IStore } from './rootStore';

interface IProps {
  initialValue: Record<any, any>;
  children: ReactElement;
}

// 如果在服务器端渲染上下文中使用观察者； 确保调用enableStaticRendering(true)，这样观察者就不会订阅任何使用的observables，并且不会引入GC问题。
enableStaticRendering(true);

const StoreContext = createContext({});

export const StoreProvider = ({ initialValue, children }: IProps) => {
  const store: IStore = useLocalObservable(createStore(initialValue));
    
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
};

export const useStore = () => {
  const store: IStore = useContext(StoreContext) as IStore;
  if (!store) throw new Error('数据不存在');
  
  return store;
}
