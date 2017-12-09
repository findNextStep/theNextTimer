interface ITheNextInputNumberInitOption {
  /**
   * 输入框最大值
   * maximun value can be input
   * @type {number}
   * @memberof ITheNextInputNumberInitOption
   */
  max?: number;
  /**
   * 输入框最小值
   * minimun value can be input
   * @type {number}
   * @memberof ITheNextInputNumberInitOption
   */
  min?: number;
  /**
   * 输入框默认值
   * default value of the inputer
   * @type {number}
   * @memberof ITheNextInputNumberInitOption
   */
  default?: number;
}
/**
 * 数字输入框类
 * Number input class
 * @class TheNextInputNumber
 * @extends {TheNextInput}
 * @requires theNextHTMLInterface
 */
class TheNextInputNumber implements TheNextInput {
  private numberInput: HTMLInputElement;
  private maxNumber: number;
  private minNumber: number;
  private onChangeFun: (innerNumber: number) => void;
  /**
   * 创建一个输入框
   * create a number inputer
   * @param {ITheNextInputNumberInitOption} option 输入框选项
   * @memberof TheNextInputNumber
   */
  constructor(option?: ITheNextInputNumberInitOption) {
    this.numberInput = document.createElement("input");
    this.numberInput.classList.add("theNextNumberInput");
    this.numberInput.type = "number";
    // 加载设置信息
    // load setting option
    if (option != null) {
      if (option.max != null && option.min != null) {
        if (option.max < option.min) {
          const tmp: number = option.max;
          option.max = option.min;
          option.min = tmp;
        }
      }
      if (option.max != null) {
        this.max = option.max;
      }
      if (option.min != null) {
        this.min = option.min;
      }
      if (option.default != null) {
        this.number = option.default;
      }
    }
    this.whenChange();
    // 设置避免非法输入
    this.numberInput.oninput = () => {
      if (isNaN(this.innerNumber)) {
        if (this.minNumber != null) {
          this.number = this.minNumber;
        } else if (this.maxNumber != null) {
          this.number = this.maxNumber;
        } else {
          this.number = 0;
        }
      }
      this.number = this.innerNumber;
      this.whenChange();
    };
    this.numberInput.onchange = () => {
      this.whenChange();
    };
  }
  public get container(): HTMLInputElement {
    return this.numberInput;
  }
  /**
   * 设置最大值
   * set Maximum value
   * @memberof TheNextInputNumber
   */
  public set max(max: number) {
    this.maxNumber = max;
    this.numberInput.max = max.toString();
  }
  /**
   * 设置最小值
   * set minimum value
   * @memberof TheNextInputNumber
   */
  public set min(min: number) {
    this.minNumber = min;
    this.numberInput.min = min.toString();
  }
  /**
   * 设置数字变化的回调函数
   * set callback function when input number change
   * @memberof TheNextInputNumber
   */
  public set onChange(fun: (innerNumber: number) => void) {
    this.onChangeFun = fun;
  }
  /**
   * 获取输入框数字
   * get input numbers
   * @readonly
   * @type {number}
   *        输入框数字
   *        input number
   * @memberof TheNextInputNumber
   */
  public get innerNumber(): number {
    return this.numberInput.valueAsNumber;
  }
  /**
   * 设置输入框的内容
   *
   * @memberof TheNextInputNumber
   */
  public set number(num: number) {
    console.log(num);
    this.numberInput.value = num.toString();
  }
  /**
   * 设置回车响应
   * set callback function when enter
   * @memberof TheNextInputNumber
   */
  public set onSubmit(fun: () => void) {
    this.numberInput.onsubmit = () => {
      return false;
    };
    this.numberInput.onkeydown = event => {
      if (event.keyCode === 13) {
        fun();
      }
    };
  }

  /**
   * 输入框基本的检查和响应
   * basic check
   * @protected
   * @memberof TheNextInputNumber
   */
  protected whenChange(): void {
    if (this.maxNumber != null && this.innerNumber > this.maxNumber) {
      this.number = this.maxNumber;
    }
    if (this.minNumber != null && this.innerNumber < this.minNumber) {
      this.number = this.minNumber;
    }
    if (this.onChangeFun != null) {
      this.onChangeFun(this.innerNumber);
    }
  }
}
