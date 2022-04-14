import axios from 'axios';
import React, {
  useState,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useContext,
} from 'react';
import './Account.css';
import { stateContext } from '../store';
import AccountModal from './AccountModal';
import AccountList from './AccountList';

const reducer = (state, action) => {
  switch (action.type) {
    case 'INIT': {
      return action.data;
    }
    case 'CREATE': {
      const create_date = new Date().getTime();
      const newItem = {
        ...action.data,
        create_date,
      };
      return [newItem, ...state];
    }
    case 'REMOVE': {
      return state.filter(it => it.id !== action.targetId);
    }
    case 'EDIT': {
      return state.map(it =>
        it.id === action.targetId ? { ...it, price: action.newContent } : it,
      );
    }
    default:
      return state;
  }
};

function Account() {
  const [accountData, accountSetData] = useState([]);
  const [data, dispatch] = useReducer(reducer, []);
  const context = useContext(stateContext);

  const dataId = useRef(0);

  const getData = () => {
    axios
      .get(
        `https://www.remembertrip.tk/trip/${context.state.tripList[0].id}/account`,
        {
          headers: {
            authorization: `Bearer ${context.state.accessToken}`,
            'Content-Type': 'application/json',
          },
          params: { trip_id: 1 },
        },
      )
      .then(data => {
        const initData = data.data.accounts;

        dispatch({ type: 'INIT', data: initData });
        accountSetData(initData);
      });
  };

  useEffect(() => {
    setTimeout(() => {
      getData();
    }, 1500);
  }, []);

  const onCreate = useCallback(
    (item_name, currency, category, price, paid_person, write_date) => {
      dispatch({
        type: 'CREATE',
        data: {
          item_name,
          currency,
          category,
          price,
          paid_person,
          write_date,
          id: dataId.current,
        },
      });

      let newDate = new Date();
      let nowTime =
        newDate.getFullYear() +
        '-' +
        newDate.getMonth() +
        '-' +
        newDate.getDate() +
        ' ' +
        newDate.getHours() +
        ':' +
        newDate.getMinutes() +
        ':' +
        newDate.getSeconds();

      axios
        .post(
          `https://www.remembertrip.tk/trip/${context.state.tripList[0].id}/account`,
          {
            item_name,
            category,
            currency,
            price,
            paid_person,
            write_date: nowTime,
            trip_id: 1,
          },
          {
            headers: {
              authorization: `Bearer ${context.state.accessToken}`,
              'Content-Type': 'application/json',
            },
          },
        )
        .then(res => {
          const account_id = res.data.account_id;
          const created_date = new Date().getTime();
          const newItem = {
            item_name,
            currency,
            category,
            price,
            paid_person,
            write_date,
            id: account_id,
          };
          accountSetData([newItem, ...accountData]);
        });
    },
    [accountData],
  );

  const onRemove = targetId => {
    dispatch({ type: 'REMOVE', targetId });

    axios.delete(
      `https://www.remembertrip.tk/trip/${context.state.tripList[0].id}/account/${targetId}`,
      {
        headers: {
          authorization: `Bearer ${context.state.accessToken}`,
          'Content-Type': 'application/json',
        },
        data: {
          account_id: targetId,
        },
      },
    );
    const newAccountList = data.filter(it => it.id !== targetId);
    accountSetData(newAccountList);
  };

  const onEdit = (targetId, newContent) => {
    dispatch({ type: 'EDIT', targetId, newContent });

    accountSetData(
      data.map(it => (it.id === targetId ? { ...it, price: newContent } : it)),
    );
  };

  const memoizedDispatches = useMemo(() => {
    return { onCreate, onRemove, onEdit };
  }, []);

  return (
    <div className="Account">
      <div className="AccountHead">
        <div className="AccountHeadSpan">
          <div className="AccountHeadTotalMoney">
            {`${context.state.tripList[0].country}에`}
            <br />
            {`총 ${
              context.state.tripList[0].totalPrice / 10000
            }만원을 들고갔어요`}
          </div>
          <div className="AccountHeadpaidMoney">
            ✅ 사용한돈/남은돈 만들어서 글로 보여주실거면 여기에 넣어주세요 !
          </div>
        </div>
        <AccountModal onCreate={onCreate} />
      </div>
      <AccountList
        onEdit={onEdit}
        onRemove={onRemove}
        AccountList={accountData}
      />
    </div>
  );
}
export default Account;
