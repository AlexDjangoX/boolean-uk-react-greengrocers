import { useReducer } from 'react'
import Modal from './Modal'
import '../src/styles/modal.css'
import classes from '../src/styles/Calculator.module.css'
import { Button } from '@nextui-org/react'

import OperationButton from './OperationButton'
import DigitalButton from './DigitalButton'

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate'
}

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite)
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false
        }
      if (payload.digit === '.' && state.currentOperand == null) return state
      if (payload.digit === '0' && state.currentOperand === '0') return state
      if (state.currentOperand === '0' && payload.digit !== '.') return state
      if (payload.digit === '.' && state.currentOperand.includes('.'))
        return state

      return {
        ...state,
        currentOperand: `${state.currentOperand || ''}${payload.digit}`
      }
    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null)
        return state

      if (state.currentOperand === null) {
        return { ...state, operation: payload.operation }
      }

      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null
        }
      }

      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null
      }
    case ACTIONS.CLEAR:
      return {
        ...state,
        currentOperand: '0',
        previousOperand: null,
        operation: null
      }
    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite)
        return {
          ...state,
          overwrite: false,
          currentOperand: null
        }
      if (state.currentOperand == null) return state
      if (state.currentOperand.length === 1) {
        return { ...state, currentOperand: null }
      }
      return { ...state, currentOperand: state.currentOperand.slice(0, -1) }

    case ACTIONS.EVALUATE:
      if (
        state.operation == null ||
        state.currentOperand == null ||
        state.previousOperand == null
      ) {
        return state
      }
      return {
        ...state,
        overwrite: true,
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state)
      }
    default:
      return state
  }
}

function evaluate({
  currentOperand,
  previousOperand,
  operation,
  hideCalculator
}) {
  const prev = parseFloat(previousOperand)
  const current = parseFloat(currentOperand)
  if (isNaN(prev) || isNaN(current)) return ''
  let computation = ''
  switch (operation) {
    case '+':
      computation = prev + current
      break
    case '-':
      computation = prev - current
      break
    case '*':
      computation = prev * current
      break
    case '/':
      computation = prev / current
      break
    default:
      return computation
  }
  return computation.toString()
}

const INTEGER_FORMATTER = new Intl.NumberFormat('en-us', {
  maximumFractionDigits: 0
})

function formatOperand(operand) {
  if (operand == null) return
  const [integer, decimal] = operand.split('.')
  if (decimal == null) return INTEGER_FORMATTER.format(integer)
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}

const Calculator = ({ hideCalculator }) => {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    { currentOperand: null, previousOperand: null, operation: null }
  )
  return (
    <Modal>
      <div className={classes['calculator-grid']}>
        <Button auto color="secondary" rounded flat onPress={hideCalculator}>
          Close Calculator
        </Button>

        <div className={classes.output}>
          <div className={classes['previous-operand']}>
            {formatOperand(previousOperand)} {operation}
          </div>
          <div className="current-operand">{formatOperand(currentOperand)}</div>
        </div>
        <button
          className="span-two"
          onClick={() => dispatch({ type: ACTIONS.CLEAR })}
        >
          AC
        </button>
        <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>
          DEL
        </button>
        <OperationButton operation="/" dispatch={dispatch} />
        <DigitalButton digit="1" dispatch={dispatch} />
        <DigitalButton digit="2" dispatch={dispatch} />
        <DigitalButton digit="3" dispatch={dispatch} />

        <OperationButton operation="*" dispatch={dispatch} />
        <DigitalButton digit="4" dispatch={dispatch} />
        <DigitalButton digit="5" dispatch={dispatch} />
        <DigitalButton digit="6" dispatch={dispatch} />

        <OperationButton operation="+" dispatch={dispatch} />
        <DigitalButton digit="7" dispatch={dispatch} />
        <DigitalButton digit="8" dispatch={dispatch} />
        <DigitalButton digit="9" dispatch={dispatch} />

        <OperationButton operation="-" dispatch={dispatch} />
        <DigitalButton digit="." dispatch={dispatch} />
        <DigitalButton digit="0" dispatch={dispatch} />
        <button
          onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
          className="span-two"
        >
          =
        </button>
      </div>
    </Modal>
  )
}

export default Calculator
