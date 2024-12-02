from src.math_operation import add, subtract

def test_add():
    assert add(2,3)==5
    assert add(-1,1)==0

def test_sub():
    assert subtract(6,5)==1 