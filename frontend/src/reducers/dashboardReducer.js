import { RETRIEVE_DASHBOARD, GET_DADOS_DASHBOARD, CREATE_DASHBOARD } from '../actions/actionTypes/dashboardActionTypes';


const initialState = [];

function dashboardReducer(dashboard = initialState, action) {
	const { type, payload } = action;

	console.log("Chegou aqui  no reducer ??? " + type + payload);

  	switch (type) {
    	case CREATE_DASHBOARD:
      		return [...dashboard, payload];

    	case RETRIEVE_DASHBOARD:
      		return payload;

		case GET_DADOS_DASHBOARD:
			console.log("payload");
			console.table(payload);
			return payload;

    	// case CREATE_GRAFICO
    
    	// case UPDATE_GRAFICO

		// case UPDATE_TUTORIAL:
		//   return tutorials.map((tutorial) => {
		//     if (tutorial.id === payload.id) {
		//       return {
		//         ...tutorial,
		//         ...payload,
		//       };
		//     } else {
		//       return tutorial;
		//     }
		//   });

		// case DELETE_TUTORIAL:
		//   return tutorials.filter(({ id }) => id !== payload.id);

		// case DELETE_ALL_TUTORIALS:
		//   return [];

		default:
			return dashboard;
	}
};

export default dashboardReducer;