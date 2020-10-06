from rest_framework import serializers

# from django.contrib.auth import get_user_model()
from .models import User, UserType

roles = (
    ("ARTIST", "artist"),
    ("PRODUCTION", "production"),
    ("PRO-CO", "project-cordinator"),
    ("PRO-TL", "project-lead"),
    ("PRO-SUP", "project-supervisor"),
    ("IT-SUPPORT", "It-support"),
)


class UserTypeField(serializers.Field):
    def to_representation(self, value):
        usertype = value.usertype
        ret = {}
        if usertype.exists():
            ret = {"usertype": roles[usertype.type]}
        print(usertype)

        return ret

    def to_internal_value(self, data):
        ret = {"assigned_to": data["username"]}
        return ret


class UserSerializer(serializers.ModelSerializer):
    usertype = UserTypeField(source="*")

    class Meta:
        model = User
        fields = [
            "id",
            "email",
            "username",
            "dept",
            "designation",
            "doj",
            "igene_id",
            "usertype",
        ]

